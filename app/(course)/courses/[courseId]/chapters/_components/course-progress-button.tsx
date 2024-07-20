'use client'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { CheckCircle, Circle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import * as Blockly from 'blockly'
import 'blockly/javascript'
import * as JsGenerator from 'blockly/javascript'

interface CourseProgressButtonProps {
  chapterId: string
  courseId: string
  isCompleted?: boolean
  nextChapterId?: string
  chapterCode: string
}

export const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
  chapterCode,
}: CourseProgressButtonProps) => {
  const router = useRouter()
  //   TODO: Create confetti hook
  // const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false)

  // const onClick = async () => {
  //   try {
  //     setIsLoading(true)

  //     await axios.put(
  //       `/api/courses/${courseId}/chapters/${chapterId}/progress`,
  //       {
  //         isCompleted: !isCompleted,
  //       }
  //     )

  //     if (!isCompleted && !nextChapterId) {
  //       // TODO: Uncomment this line
  //       // confetti.onOpen()
  //     }

  //     if (!isCompleted && nextChapterId) {
  //       router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
  //     }

  //     toast.success('Tiến độ đã được cập nhật')
  //     router.refresh()
  //   } catch {
  //     toast.error('Tiến độ không thể cập nhật')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const onClick = async () => {
    try {
      const workspace = Blockly.getMainWorkspace()
      const xml = Blockly.Xml.workspaceToDom(workspace)
      const answer = Blockly.Xml.domToText(xml)
      const code = JsGenerator.javascriptGenerator.workspaceToCode(workspace)
      console.log('code', code)
      console.log('chapterCode', chapterCode)
      if (isCompleted)
        return await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: false,
          }
        )
      if (code !== chapterCode) return toast.error('Đáp án không chính xác')
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      )

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
      }

      toast.success('Tiến độ đã được cập nhật')
      router.refresh()
    } catch {
      toast.error('Tiến độ không thể cập nhật')
    } finally {
    }
  }

  const Icon = isCompleted ? CheckCircle : Circle
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? 'success' : 'outline'}
      className="w-full md:w-auto"
    >
      {isCompleted ? 'Làm lại' : 'Kiểm tra'}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  )
}
