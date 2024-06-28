'use client'
import { UserButton, useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import SearchInput from '@/components/search-input'
import { isTeacher } from '@/lib/teacher'

export function NavbarRoutes() {
  const { userId } = useAuth()
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith('/teacher')
  const isCoursePage = pathname?.startsWith('/courses')
  const isSearchPage = pathname?.startsWith('/search')
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button type="button" variant="ghost">
              <LogOut className="w-4 h-4 mr-2" />
              Thoát
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Chế độ giáo viên
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  )
}
