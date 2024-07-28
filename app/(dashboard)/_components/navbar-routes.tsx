'use client'
import { UserButton, useAuth } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import SearchInput from '@/components/search-input'
import { isTeacher } from '@/lib/role'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function NavbarRoutes() {
  const [isTeacherOrAdmin, setIsTeacherOrAdmin] = useState(false)
  const { userId } = useAuth()
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith('/teacher')
  const isCoursePage = pathname?.startsWith('/courses')
  const isHomePage = pathname === '/' || pathname?.startsWith('/dashboard')
  const isChapterPage =
    pathname?.startsWith('/courses') && pathname?.includes('/chapters')

  const authorize = async () => {
    const response = await axios.get('/api/auth/authorize')
    const { role } = response.data
    setIsTeacherOrAdmin(role === 'Teacher' || role === 'Admin')
  }
  useEffect(() => {
    authorize()
  }, [])
  return (
    <>
      {isHomePage && (
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
        ) : isTeacherOrAdmin ? (
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
