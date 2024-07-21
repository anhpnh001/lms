import { getChapter } from '@/actions/get-chapter'
import Banner from '@/components/banner'
import { auth } from '@clerk/nextjs/server'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import CourseEnrollButton from '../_components/course-enroll-button'
import { Separator } from '@/components/ui/separator'
import { Preview } from '@/components/preview'
import { File } from 'lucide-react'
import { CourseProgressButton } from '../_components/course-progress-button'
import BlocklyComponent from '@/components/BlocklyComponent'
import * as Blockly from 'blockly'
import 'blockly/javascript'
import * as JsGenerator from 'blockly/javascript'
import axios from 'axios'
import toast from 'react-hot-toast'

export default async function ChapterIdPage({
  params,
}: {
  params: { courseId: string; chapterId: string }
}) {
  const { userId } = auth()
  if (!userId) {
    return redirect('/')
  }

  const { chapterId, courseId } = params

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId,
    courseId,
  })

  if (!chapter || !course) {
    return redirect('/')
  }

  const onClick = async () => {
    try {
      const workspace = Blockly.getMainWorkspace()
      const xml = Blockly.Xml.workspaceToDom(workspace)
      const answer = Blockly.Xml.domToText(xml)
      const code = JsGenerator.javascriptGenerator.workspaceToCode(workspace)

      if (code !== chapter.code) return toast.error('Đáp án không chính xác')
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: true,
        }
      )

      const nextChapterId = nextChapter?.id
      const isCompleted = !!userProgress?.isCompleted

      if (!isCompleted && nextChapterId) {
        redirect(`/courses/${params}/chapters/${nextChapterId}`)
      }

      toast.success('Tiến độ đã được cập nhật')
    } catch {
      toast.error('Tiến độ không thể cập nhật')
    } finally {
    }
  }

  const isLocked = !chapter.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted
  console.log('chapter', chapter.expression)
  return (
    <div className="flex-1 flex flex-col px-4">
      {userProgress?.isCompleted && (
        <Banner variant="success" label="Bạn đã hoàn thành bài học này." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="Bạn cần mua khóa học này để xem bài học này."
        />
      )}
      <div className="flex flex-col w-full max-w-4xl mx-auto pb-20 flex-1">
        <div className="h-full z-0">
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {/* TODO: Complete enroll functionality */}
            {purchase ? (
              <CourseProgressButton
                chapterId={chapterId}
                courseId={courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
                chapterCode={chapter.code || ''}
              />
            ) : (
              <CourseEnrollButton courseId={courseId} price={course.price!} />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}

          <BlocklyComponent initialXml={chapter.expression || ''} />
        </div>
      </div>
    </div>
  )
}
