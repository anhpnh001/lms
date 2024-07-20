'use client'
import { BarChart, Compass, Layout, List, User } from 'lucide-react'
import SidebarItem from './sidebar-item'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
const guestRoutes = [
  {
    icon: Layout,
    label: 'Bảng điều khiển',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Tìm kiếm',
    href: '/search',
  },
  {
    icon: BarChart,
    label: 'Phụ huynh',
    href: '/parent',
  },
]

const teacherRoutes = [
  {
    icon: List,
    label: 'Khóa học',
    href: '/teacher/courses',
  },
  {
    icon: BarChart,
    label: 'Phân tích',
    href: '/teacher/analytics',
  },
  {
    icon: User,
    label: 'Người dùng',
    href: '/teacher/users',
  },
]

export const SidebarRoutes = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const pathname = usePathname()

  const authorize = async () => {
    const response = await axios.get('/api/auth/authorize')
    const { role } = response.data
    setIsAdmin(role === 'Admin')
  }
  useEffect(() => {
    authorize()
  }, [])

  const isTeacherPage = pathname?.startsWith('/teacher')
  const routes = isTeacherPage ? teacherRoutes : guestRoutes
  return (
    <div className="flex flex-col w-full">
      {routes.map(
        // if route.label == 'Người dùng' , check if isAdmin is true, if true, render the route
        (route) =>
          //  (
          //   <SidebarItem
          //     key={route.href}
          //     icon={route.icon}
          //     label={route.label}
          //     href={route.href}
          //   />
          // )
          route.label === 'Người dùng' && !isAdmin ? null : (
            <SidebarItem
              key={route.href}
              icon={route.icon}
              label={route.label}
              href={route.href}
            />
          )
      )}
    </div>
  )
}
