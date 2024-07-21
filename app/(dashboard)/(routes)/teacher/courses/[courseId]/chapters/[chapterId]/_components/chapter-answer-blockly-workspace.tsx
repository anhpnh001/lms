'use client'
import * as z from 'zod'
import axios from 'axios'
import * as Blockly from 'blockly'
import 'blockly/javascript'
import * as JsGenerator from 'blockly/javascript'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Pencil, RotateCw } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Chapter } from '@prisma/client'
import { Editor } from '@/components/editor'
import { Preview } from '@/components/preview'
import BlocklyComponent from '@/components/BlocklyComponent'

interface ChapterAnswerBlocklyWorkspaceProps {
  initialData: Chapter
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  // expression: z.string().min(1),
  // answer: z.string().min(1),
})

export default function ChapterAnswerBlocklyWorkspace({
  initialData,
  courseId,
  chapterId,
}: ChapterAnswerBlocklyWorkspaceProps) {
  const [isEditing, setIsEditing] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expression: initialData?.expression || '',
      answer: initialData?.answer || '',
    },
  })
  console.log(initialData.answer)
  const { isSubmitting } = form.formState

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const workspace = Blockly.getMainWorkspace()
      const xml = Blockly.Xml.workspaceToDom(workspace)
      const answer = Blockly.Xml.domToText(xml)
      const code = JsGenerator.javascriptGenerator.workspaceToCode(workspace)
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        answer,
        code,
      })
      toast.success('Bài học đã được cập nhật')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi cập nhật khoá học')
      console.log(error)
    }
  }

  const loadExpression = () => {
    const workspace = Blockly.getMainWorkspace()
    Blockly.Xml.domToWorkspace(
      Blockly.utils.xml.textToDom(initialData.expression || ''),
      workspace
    )
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Đáp án
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Huỷ</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Sửa
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            'text-sm mt-2',
            !initialData.answer && 'text-slate-500 italic'
          )}
        >
          {!initialData.answer && 'Không có đáp án'}
          {initialData.answer && <Preview value={initialData.answer} />}
        </div>
      )}
      {isEditing && (
        <>
          <Button onClick={loadExpression} variant="outline">
            <RotateCw className="h-4 w-4 mr-2" />
            Lấy biểu thức
          </Button>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4 z-0"
            >
              <BlocklyComponent initialXml={initialData.answer || ''} />
              <div className="flex items-center gap-x-2">
                <Button disabled={isSubmitting} type="submit">
                  Lưu
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  )
}
