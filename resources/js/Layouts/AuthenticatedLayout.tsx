import { usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { LogOut } from "lucide-react";
import { useForm } from "@inertiajs/react"

export default function Authenticated({
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

        const { post } = useForm()

        const handleLogout = () => {
          post(route('logout'))
        }

    return (
        <div className="max-h-screen bg-gray-100">
            <nav className="bg-blue-600 p-4 flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold ml-10">MAS POS</h1>
                <div className="flex items-center gap-2 mr-10">
                    <span className="text-white">{user.username}</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-9 w-9">
                                <AvatarImage
                                    src="/placeholder-user.jpg"
                                    alt="Avatar"
                                />
                                <AvatarFallback>R</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>

            <main className="bg-white">{children}</main>
        </div>
    );
}
