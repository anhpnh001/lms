import React from 'react'
import Logo from './logo'
import { SidebarRoutes } from './sidebar-routes'

export default function Sidebar() {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="h-[80px] p-6 d flex justify-center items-center">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}
