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

export default async function CourseIdPage({
  params,
}: {
  params: { courseId: string }
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }
  const course = await db.course.findUnique({
    where: { id: params.courseId, userId },
    include: {
      chapters: {
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  if (!course) {
    return redirect('/')
  }

  const requireFields = [
    course.title,
    course.description,
    course.imageURL,
    course.price || course.price === 0,
    // TODO: Uncomment when categories are implemented
    // course.categoryId,
    // course.chapters.some((chapter) => chapter.isPublished),
  ]

  const totalFields = requireFields.length
  const completedFields = requireFields.filter(Boolean).length
  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requireFields.every(Boolean)

  return (
    <>
      {!course.isPublished && (
        <Banner
          label="Khoá học này chưa được công khai. Nó sẽ không hiển thị cho học viên"
          variant="warning"
        />
      )}
      <div className="p-6 w-full">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Thiết lập khoá học</h1>
            <span className="text-sm text-slate-700">
              Hoàn thành tất cả các trường {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge variant="success" icon={LayoutDashboard} />
              <h2 className="text-xl">Tinh chỉnh khoá học</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Tiến độ</h2>
              </div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Học phí</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
