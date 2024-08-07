import { getAnalytics } from '@/actions/get-analytics'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DataCard } from './_components/data-card'
import { Chart } from './_components/chart'
import { db } from '@/lib/db'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { getProgress } from '@/actions/get-process'

export default async function AnalyticsPage() {
  const { userId } = auth()
  if (!userId) {
    return redirect('/')
  }
  const { data, totalRevenue, totalSales } = await getAnalytics(userId)

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const purchases = await db.purchase.findMany({
    where: {
      courseId: {
        in: courses.map((course) => course.id),
      },
    },
  })

  const users = await db.user.findMany({
    where: {
      clerkId: {
        in: purchases.map((purchase) => purchase.userId),
      },
    },
  })

  const progresses = await Promise.all(
    purchases.map((purchase) => getProgress(purchase.userId, purchase.courseId))
  )
  console.log(progresses)

  const orders = purchases.map((purchase, index) => {
    const course = courses.find((course) => course.id === purchase.courseId)
    const user = users.find((user) => user.clerkId === purchase.userId)
    return {
      ...purchase,
      course,
      user,
      progress: progresses[index],
    }
  })

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Tổng doanh thu" value={totalRevenue} shouldFormat />
        <DataCard label="Tổng số lượng bán" value={totalSales} />
      </div>
      <Chart data={data} />
      <DataTable columns={columns} data={orders} />
    </div>
  )
}
