'use client'
import { Category } from '@prisma/client'
import { FcGraduationCap, FcSurvey, FcCalendar } from 'react-icons/fc'
import { IconType } from 'react-icons'
import React from 'react'
import CategoryItem from './category-item'

interface CategoriesProps {
  items: Category[]
}

const iconMap: Record<Category['name'], IconType> = {
  'Khóa học': FcGraduationCap,
  'Luyện thi': FcSurvey,
  'Cuộc thi': FcCalendar,
}

export default function Categories({ items }: CategoriesProps) {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}
