import { cookies } from 'next/headers'
import { ChatLayout } from '@/components/chat/chat-layout'
import React from 'react'

export default function Chat() {
  const layout = cookies().get('react-resizable-panels:layout')
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  return (
    <div className="flex flex-col flex-1 max-h-full">
      <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
    </div>
  )
}
