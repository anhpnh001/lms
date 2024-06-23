'use client'
import { BarChart, Compass, Layout, List } from 'lucide-react'
import SidebarItem from './sidebar-item'
import { usePathname } from 'next/navigation'
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
]

export const SidebarRoutes = () => {
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith('/teacher')
  const routes = isTeacherPage ? teacherRoutes : guestRoutes
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
