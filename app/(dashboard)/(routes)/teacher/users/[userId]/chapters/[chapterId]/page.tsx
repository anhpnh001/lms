import { IconBadge } from '@/components/icon-badge'
import Banner from '@/components/banner'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { ArrowLeft, Eye, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ChapterTitleForm from './_components/chapter-title-form'
import ChapterDescriptionForm from './_components/chapter-description-form'
import ChapterAccessForm from './_components/chapter-access-form'
import { ChapterActions } from './_components/chapter-actions'
import BlocklyComponent from '@/components/BlocklyComponent'

export default async function ChapterIdPage({
  params,
}: {
  params: { courseId: string; chapterId: string }
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  })

  if (!chapter) {
    return redirect('/')
  }

  const requiredFields = [
    chapter.title,
    chapter.description,
    // chapter.videoUrl
  ]
  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean)
  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="Bài học này chưa được công khai. Nó sẽ không hiển thị trong khoá học"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại khoá học
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Thiết lập bài học</h1>
                <span className="text-sm text-slate-700">
                  Hoàn thành tất cả các trường {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Tinh chỉnh bài học</h2>
              </div>
              <ChapterTitleForm
                initialData={{ title: chapter.title }}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2>Cài đặt truy cập</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <BlocklyComponent />
          </div>
        </div>
      </div>
    </>
  )
}
