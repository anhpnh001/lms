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
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import { User } from '@prisma/client'
import { Combobox } from '@/components/ui/combobox'

interface RoleFormProps {
  initialData: User
  userId: string
  options: { label: string; value: string }[]
}

const formSchema = z.object({
  roleName: z.string().min(1),
})

export default function RoleForm({
  initialData,
  userId,
  options,
}: RoleFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleName: initialData?.roleName || '',
    },
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

  const selectedOption = options.find(
    (option) => option.value === initialData.roleName
  )
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Vai trò
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
        <p
          className={cn(
            'text-sm mt-2',
            !initialData.roleName && 'text-slate-500 italic'
          )}
        >
          {selectedOption?.label || 'Chưa chọn vai trò'}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="roleName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options} {...field} />
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
