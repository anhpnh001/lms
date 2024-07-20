'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const authorize = async () => {
    const response = await axios.get('/api/auth/authorize')
    const { role } = response.data
    if (role !== 'Teacher' && role !== 'Admin') {
      router.push('/')
    }
  }

  useEffect(() => {
    authorize()
  }, [])

  return <>{children}</>
}
