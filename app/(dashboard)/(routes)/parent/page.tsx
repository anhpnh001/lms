import { getAnalytics } from '@/actions/get-analytics'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DataCard } from './_components/data-card'
import { Chart } from './_components/chart'
import { db } from '@/lib/db'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { getPurchases } from '@/actions/get-purchases'
import { getProgress } from '@/actions/get-process'

export default async function AnalyticsPage() {
  const { userId } = auth()
  if (!userId) {
    return redirect('/')
  }
  const { data, totalRevenue, totalSales } = await getPurchases(userId)

  const purchases = await db.purchase.findMany({
    where: {
      userId,
    },
  })

  const courses = await db.course.findMany({
    where: {
      id: {
        in: purchases.map((purchase) => purchase.courseId),
      },
    },
  })

  const users = await db.user.findMany({
    where: {
      clerkId: {
        in: courses.map((course) => course.userId),
      },
    },
  })

  const progresses = await Promise.all(
    purchases.map((purchase) => getProgress(userId, purchase.courseId))
  )
  console.log(progresses)

  const orders = purchases.map((purchase, index) => {
    const course = courses.find((course) => course.id === purchase.courseId)
    const user = users.find((user) => course && user.clerkId === course.userId)
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
        <DataCard label="Tổng chi phí" value={totalRevenue} shouldFormat />
        <DataCard label="Tổng số lượng đăng ký" value={totalSales} />
      </div>
      <Chart data={data} />
      <DataTable columns={columns} data={orders} />
    </div>
  )
}
