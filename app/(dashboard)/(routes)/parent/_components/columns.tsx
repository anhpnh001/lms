'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/format'
import CourseProgress from '@/components/course-progress'

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'course.title',
    id: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Khoá học
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorFn: (row) =>
      row.user ? `${row.user.firstName || ''} ${row.user.lastName || ''}` : '',
    id: 'fullName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Giáo viên
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => getValue() as string,
  },
  {
    accessorKey: 'course.price',
    id: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Giá
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price') || '0')
      const formattedPrice = formatPrice(price)
      return <span>{formattedPrice}</span>
    },
  },
  {
    accessorKey: 'createdAt',
    id: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ngày đăng ký
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date
      return date.toLocaleString()
    },
  },
  {
    accessorKey: 'updatedAt',
    id: 'updatedAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Lần học gần nhất
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => {
      // If the date more than 10 hour ago, badge it as 'destructive' with tooltip
      const date = getValue() as Date
      // return date.toLocaleString()
      return (
        <Badge
          variant={
            date
              ? date.getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000
                ? 'destructive'
                : 'default'
              : 'outline'
          }
        >
          {date ? date.toLocaleString() : 'Chưa học'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'progress',
    id: 'progress',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tiến độ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const progress = Number(row.getValue('progress'))
      return (
        <CourseProgress
          variant={progress >= 100 ? 'success' : 'default'}
          value={progress}
        />
      )
    },
  },
]
