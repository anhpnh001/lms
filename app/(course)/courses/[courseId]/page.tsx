import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function CourseIdPage({
  params,
}: {
  params: { courseId: string }
}) {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
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
  if (course.chapters.length === 0) {
    return redirect(`/search`)
  }
  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`)
}
