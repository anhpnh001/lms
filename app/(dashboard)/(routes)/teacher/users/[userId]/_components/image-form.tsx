'use client'
import * as z from 'zod'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Course } from '@prisma/client'
import Image from 'next/image'
import { FileUpload } from '@/components/file-upload'

interface ImageFormProps {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
  imageURL: z.string().min(1, {
    message: 'Image   is required',
  }),
})

export default function ImageForm({ initialData, courseId }: ImageFormProps) {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      toast.success('Khoá học đã được cập nhật')
      toggleEdit()
      router.refresh()
    } catch {
      toast.error('Đã xảy ra lỗi khi cập nhật khoá học')
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Hình ảnh
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Huỷ</>}
          {!isEditing && !initialData.imageURL && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Thêm
            </>
          )}
          {!isEditing && initialData.imageURL && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Sửa
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageURL ? (
          <div
            className="flex items-center justify-center h-60
        bg-slate-200 rounded-md"
          >
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageURL}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageURL: url })
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Tỷ lệ khuyến nghị 16:9
          </div>
        </div>
      )}
    </div>
  )
}
