import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'

export default async function CompetitionIdPage({
  params,
}: {
  params: { competitionId: string }
}) {
  const course = await db.course.findUnique({
    where: {
      id: params.competitionId,
    },
    include: {
      chapters: {
        where: {
          // TODO: Uncomment this line after implementing course publish feature
          // isPublished: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

  if (!course) {
    return redirect('/')
  }
  // if (course.chapters.length === 0) {
  //   return redirect(`/search`)
  // }
  const users = [
    {
      id: '1',
      firstName: 'Nguyễn',
      lastName: 'Văn A',
      status: 'ready',
    },
    {
      id: '2',
      firstName: 'Nguyễn',
      lastName: 'Văn B',
      status: 'ready',
    },
    {
      id: '3',
      firstName: 'Nguyễn',
      lastName: 'Văn C',
      status: 'ready',
    },
    {
      id: '4',
      firstName: 'Nguyễn',
      lastName: 'Văn D',
      status: 'ready',
    },
    {
      id: '5',
      firstName: 'Nguyễn',
      lastName: 'Văn E',
      status: 'ready',
    },
    {
      id: '6',
      firstName: 'Nguyễn',
      lastName: 'Văn F',
      status: 'ready',
    },
    {
      id: '7',
      firstName: 'Nguyễn',
      lastName: 'Văn G',
      status: 'ready',
    },
    {
      id: '8',
      firstName: 'Nguyễn',
      lastName: 'Văn H',
      status: 'ready',
    },
    {
      id: '9',
      firstName: 'Nguyễn',
      lastName: 'Văn I',
      status: 'ready',
    },
    {
      id: '10',
      firstName: 'Nguyễn',
      lastName: 'Văn K',
      status: 'ready',
    },
  ]
  return (
    <div className="p-6">
      <DataTable columns={columns} data={users} />
    </div>
  )
}
