import { Message, UserData } from '@/app/data'
import ChatTopbar from './chat-topbar'
import { ChatList } from './chat-list'
import React, { useEffect } from 'react'

interface ChatProps {
  messages?: Message[]
  selectedUser: UserData
  isMobile: boolean
}

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(messages ?? [])

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage])
    try {
      fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify({ text: newMessage.text }),
      })
    } catch (error) {
      console.log('Error sending message', error)
    }
  }

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  )
}
