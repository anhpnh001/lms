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
import { Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Chapter } from '@prisma/client'
import { Editor } from '@/components/editor'
import { Preview } from '@/components/preview'
import BlocklyComponent from '@/components/BlocklyComponent'

interface ChapterExpressionBlocklyWorkspaceProps {
  initialData: Chapter
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  // expression: z.string().min(1),
})

export default function ChapterExpressionBlocklyWorkspace({
  initialData,
  courseId,
  chapterId,
}: ChapterExpressionBlocklyWorkspaceProps) {
  const [blocklyXml, setBlocklyXml] = useState(initialData.expression || '')
  const [isEditing, setIsEditing] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expression: initialData?.expression || '',
    },
  })
  const { isSubmitting } = form.formState

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const workspace = Blockly.getMainWorkspace()
      const xml = Blockly.Xml.workspaceToDom(workspace)
      const expression = Blockly.Xml.domToText(xml)
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        expression,
      })
      toast.success('Bài học đã được cập nhật')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi cập nhật khoá học')
      console.log(error)
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Biểu thức
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
            !initialData.expression && 'text-slate-500 italic'
          )}
        >
          {!initialData.expression && 'Không có biểu thức'}
          {initialData.expression && <Preview value={initialData.expression} />}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <BlocklyComponent initialXml={initialData.expression ?? ''} />
            <div className="flex items-center gap-x-2">
              <Button disabled={isSubmitting} type="submit">
                Lưu
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
