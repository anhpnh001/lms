'use client'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LogOut } from 'lucide-react'

export function NavbarRoutes() {
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith('/teacher')
  const isPlayerPage = pathname?.startsWith('/chapter')
  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button type="button" variant="ghost">
            <LogOut className="w-4 h-4 mr-2" />
            Thoát
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Chế độ giáo viên
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
