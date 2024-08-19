/*import { db } from '@/lib/db'
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
  const rooms = [
    {
      id: '1',
      name: 'Room 1',
      participants: [
        {
          id: '1',
          name: 'John Doe',
        },
        {
          id: '2',
          name: 'Jane Doe',
        },
      ],
    },
    {
      id: '1',
      name: 'Room 2',
      participants: [
        {
          id: '1',
          name: 'John Doe',
        },
        {
          id: '2',
          name: 'Jane Doe',
        },
      ],
    },
  ]
  return (
    <div className="p-6">
      <DataTable columns={columns} data={rooms} />
    </div>
  )
}
*/
