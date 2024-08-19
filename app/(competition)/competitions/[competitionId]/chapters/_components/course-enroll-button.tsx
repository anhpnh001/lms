'use client'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface CourseEnrollButtonProps {
  price: number
  courseId: string
}

export default function CourseEnrollButton({
  price,
  courseId,
}: CourseEnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post(`/api/courses/${courseId}/checkout`)
      window.location.assign(response.data.url)
    } catch {
      toast.error('Đã xảy ra lỗi khi đăng ký khóa học.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={onClick} disabled={isLoading} className="w-full md:w-auto">
      Đăng ký học với {formatPrice(price)}
    </Button>
  )
}
