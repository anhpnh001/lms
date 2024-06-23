import MobileSidebar from './mobile-sidebar'
import { NavbarRoutes } from './navbar-routes'

export default function Navbar() {
  return (
    <div className="p-4 border-b h-full flex items-center shadow-sm bg-white">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  )
}
