"use client";

import useCart from "@/app/hooks/useCart";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { storage } from "@/services/storage";
import { useEffect, useState } from "react";
import { Menu, ShoppingCart } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
} from "./ui/dropdown-menu";
import {
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";

function NavBar() {
    const router = useRouter();

    const { cart } = useCart();

    const pathName = usePathname();
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [user, setUser] = useState<{
        name: string;
        email?: string;
        avatar?: string;
        role?: string;
    } | null>(null);

    const { toggleSidebar } = useSidebar();

    const isActive = (path: string) =>
        pathName === path
            ? "text-blue-600 font-bold"
            : "text-white hover:text-blue-500 font-bold";

    useEffect(() => {
        setAuthToken(storage.getToken());
        setUser(storage.getUser());
        const handler = () => {
            setAuthToken(storage.getToken());
            setUser(storage.getUser());
        };
        window.addEventListener("auth-updated", handler);
        return () => {
            window.removeEventListener("auth-updated", handler);
        };
    }, []);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-900 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link
                        href="/"
                        className="text-2xl font-black tracking-tight text-white"
                    >
                        Revo<span className="text-blue-500">Shop</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className={`text-sm transition-colors ${isActive("/")}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className={`text-sm transition-colors ${isActive("/products")}`}
                        >
                            All Products
                        </Link>
                    </div>

                    <div className="flex gap-8 items-center">
                        <Link
                            href="/cart"
                            className="group relative flex items-center p-2"
                        >
                            <ShoppingCart
                                className={`transition-colors ${isActive("/cart")}`}
                            />

                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white group-hover:bg-blue-600">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {/* <div className="md:hidden">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Menu />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            Home
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            All Products
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div> */}

                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleSidebar}
                                className="text-white"
                            >
                                <Menu />
                            </Button>
                        </div>

                        <div className="hidden">
                            {authToken ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar size="lg">
                                            <AvatarImage
                                                src={(user as any)?.avatarUrl}
                                                alt={user?.name || "User"}
                                            />
                                            <AvatarFallback>
                                                {(
                                                    user?.name?.[0] || "U"
                                                ).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-32">
                                        {user?.role === "admin" && (
                                            <DropdownMenuGroup>
                                                <Link href="/dashboard">
                                                    <DropdownMenuItem>
                                                        Dashboard
                                                    </DropdownMenuItem>
                                                </Link>
                                            </DropdownMenuGroup>
                                        )}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem
                                                variant="destructive"
                                                onClick={() => {
                                                    storage.clearAll;
                                                    router.push("/");
                                                }}
                                            >
                                                Log out
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link href="/login">
                                    <Button variant="secondary">Login</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
