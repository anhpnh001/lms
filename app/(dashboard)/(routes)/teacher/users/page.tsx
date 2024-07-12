import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

export default async function CoursesPage() {
  const { userId } = auth()
  if (!userId) return redirect('/')

  let users = await db.user.findMany()

  return (
    <div className="p-6">
      <DataTable columns={columns} data={users} />
    </div>
  )
}
