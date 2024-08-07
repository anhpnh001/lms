'use client'

import { ConfirmModal } from '@/components/models/confirm-model'
import { Button } from '@/components/ui/button'
import { useConfettiStore } from '@/hooks/use-confetti-store'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface ActionsProps {
  disabled: boolean
  courseId: string
  isPublished: boolean
}

export const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const router = useRouter()
  const confetti = useConfettiStore()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`)
        toast.success('Bỏ công khai thành công')
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`)
        toast.success('Công khai thành công')
        confetti.onOpen()
      }
      router.refresh()
    } catch {
      toast.error('Công khai thất bại')
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/courses/${courseId}`)
      toast.success('Xóa thành công')
      router.refresh()
      router.push(`/teacher/courses`)
    } catch {
      toast.error('Xóa thất bại')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? 'Bỏ công khai' : 'Công khai'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}
