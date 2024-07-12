'use client'
import * as z from 'zod'
import axios from 'axios'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface LastNameFormProps {
  initialData: {
    lastName: string
  }
  userId: string
}

const formSchema = z.object({
  lastName: z.string().min(1, {
    message: 'Họ là bắt buộc',
  }),
})

export default function LastNameForm({
  initialData,
  userId,
}: LastNameFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })
  const { isSubmitting, isValid } = form.formState

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/users/${userId}`, values)
      toast.success('Người dùng đã được cập nhật')
      toggleEdit()
      router.refresh()
    } catch {
      toast.error('Đã xảy ra lỗi khi cập nhật người dùng')
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Họ
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
      {!isEditing && <p className="text-sm mt-2">{initialData.lastName}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Ví dụ: Nguyễn"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Lưu
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
