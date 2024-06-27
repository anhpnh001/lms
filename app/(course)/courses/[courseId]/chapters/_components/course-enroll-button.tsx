import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'

interface CourseEnrollButtonProps {
  price: number
  courseId: string
}

export default function CourseEnrollButton({
  price,
  courseId,
}: CourseEnrollButtonProps) {
  return (
    <Button className="w-full md:w-auto">
      Đăng ký học với {formatPrice(price)}
    </Button>
  )
}
