'use client'
import {
  BarChart,
  Compass,
  Layout,
  List,
  MessageCircle,
  User,
} from 'lucide-react'
import SidebarItem from './sidebar-item'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
const guestRoutes = [
  {
    icon: Compass,
    label: 'Tìm kiếm',
    href: '/',
    id: 'step-1',
  },
  {
    icon: Layout,
    label: 'Bảng điều khiển',
    href: '/dashboard',
    id: 'step-3',
  },
  {
    icon: BarChart,
    label: 'Phụ huynh',
    href: '/parent',
    id: 'step-4',
  },
  {
    icon: MessageCircle,
    label: 'Cộng đồng',
    href: '/chat',
    id: '',
  },
]

const teacherRoutes = [
  {
    icon: List,
    label: 'Khóa học',
    href: '/teacher/courses',
    id: '',
  },
  {
    icon: BarChart,
    label: 'Phân tích',
    href: '/teacher/analytics',
    id: '',
  },
  {
    icon: User,
    label: 'Người dùng',
    href: '/teacher/users',
    id: '',
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
              id={route.id}
            />
          )
      )}
    </div>
  )
}
