import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"

export function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">MAS POS</h1>
      <div className="flex items-center gap-2">
        <span className="text-white">Taufik00</span>
        <Avatar>
          <AvatarImage src="/avatar.png" alt="@taufik00" />
          <AvatarFallback>TF</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  )
}
