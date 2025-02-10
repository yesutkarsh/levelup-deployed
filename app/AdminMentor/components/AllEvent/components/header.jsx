import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { SidebarTrigger } from "../components/ui/sidebar"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-4 border-b lg:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold">Events</h1>
      </div>
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-07%20054757-H0gkZEjyiqA3cc2ATmKUAephyft0uG.png"
            alt="Admin"
          />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <span className="text-sm text-gray-600 hidden sm:inline-block">Admin User</span>
      </div>
    </header>
  )
}
