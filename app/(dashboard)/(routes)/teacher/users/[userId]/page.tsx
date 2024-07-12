import { IconBadge } from '@/components/icon-badge'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { CircleDollarSign, LayoutDashboard, ListChecks } from 'lucide-react'
import { redirect } from 'next/navigation'
import TitleForm from './_components/title-form'
import DescriptionForm from './_components/description-form'
import ImageForm from './_components/image-form'
import CategoryForm from './_components/category-form'
import PriceForm from './_components/price-form'
import ChaptersForm from './_components/chapters-form'
import { Actions } from './_components/actions'
import Banner from '@/components/banner'
import FirstNameForm from './_components/first-name-form'
import LastNameForm from './_components/last-name-form'
import RoleForm from './_components/role-form'

export default async function CourseIdPage({
  params,
}: {
  params: { userId: string }
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
  })

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const roles = await db.role.findMany()

  if (!user) {
    return redirect('/')
  }
  return (
    <>
      <div className="p-6 w-full">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Thiết lập người dùng</h1>
          </div>
          {/* <Actions
            disabled={!isComplete}
            courseId={params.userId}
            isPublished={course.isPublished}
          /> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge variant="success" icon={LayoutDashboard} />
              <h2 className="text-xl">Tinh chỉnh người dùng</h2>
            </div>
            <FirstNameForm initialData={{ firstName: user.firstName || '' }} userId={user.id} />
            <LastNameForm initialData={{ lastName: user.lastName || '' }} userId={user.id} />
            <RoleForm
              initialData={user}
              userId={user.id}
              options={roles.map((role) => ({
                label: role.name,
                value: role.name,
              }))}
            />
            {/* <TitleForm initialData={user} userId={user.id} />
            <DescriptionForm initialData={user} userId={user.id} />
            <ImageForm initialData={user} userId={user.id} />
            <CategoryForm
              initialData={user}
              userId={user.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            /> */}
          </div>
          <div className="space-y-6">
            {/* <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Tiến độ</h2>
              </div>
              <ChaptersForm initialData={user} userId={user.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Học phí</h2>
              </div>
              <PriceForm initialData={user} userId={user.id} />
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
