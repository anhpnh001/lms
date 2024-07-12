'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { Minus, SendHorizonal, X } from 'lucide-react'
import { useState } from 'react'

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false)
  const onToggle = () => setIsOpen(!isOpen)
  return (
    <div className="fixed flex flex-col bottom-0 right-[16px] z-50 w-64 shadow-md bg-white">
      {/* Title: Avatar, Name, Close */}

      <div className="flex items-center justify-between rounded-t-md bg-gray-100 px-2 py-1">
        <div className="flex items-center gap-4">
          <Image
            src="/avatar.jpg"
            width={32}
            height={32}
            className="rounded-full"
            alt="Avatar"
          />
          <div className="text-sm font-medium">Nguyễn Văn A</div>
        </div>
        <div>
          <Button variant="ghost" className="p-1" onClick={onToggle}>
            <Minus size={16} />
          </Button>
          <Button variant="ghost" className="p-1">
            <X size={16} />
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col h-72">
          <div className="flex-1 overflow-y-auto"></div>
          <div className="flex items-center p-2">
            <input
              type="text"
              placeholder="Nhập tin nhắn"
              className="flex-1 px-2 border border-gray-200 w-full h-8 text-sm focus:outline-none rounded-l-md"
            />
            <Button className="h-8 rounded-l-none rounded-r-md px-3">
              <SendHorizonal size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
