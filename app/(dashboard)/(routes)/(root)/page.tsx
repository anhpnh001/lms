import { getDashboardCourses } from '@/actions/get-dashboard-courses'
import { CoursesList } from '@/components/courses-list'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { CheckCircle, Clock } from 'lucide-react'
import { redirect } from 'next/navigation'
import { InfoCard } from './_components/info-card'

export default async function Dashboard() {
  const { userId } = auth()
  if (!userId) {
    return redirect('/sign-in')
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  )

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="Đang học"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          variant="success"
          icon={CheckCircle}
          label="Đã hoàn thành"
          numberOfItems={completedCourses.length}
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  )
}
