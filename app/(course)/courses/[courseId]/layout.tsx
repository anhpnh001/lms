import { getProgress } from '@/actions/get-process'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import CourseSidebar from './_components/course-sidebar'
import { db } from '@/lib/db'
import CourseNavbar from './_components/course-navbar'

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { courseId: string }
}) {
  const { userId } = auth()
  if (!userId) {
    return redirect('/')
  }

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
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
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

  const progressCount = await getProgress(userId, course.id)

  // Add a null check before accessing properties of the 'course' object
  // if (!course.chapters || !course.chapters.length) {
  //   return null
  // }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="md:pl-80 pt-[80px] h-full flex-1 flex flex-col">
        {children}
      </main>
    </div>
  )
}
