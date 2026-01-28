"use client";

import { useState, useEffect } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    useSidebar,
} from "./ui/sidebar";
import { Home, LayoutDashboard, LogOut, Package } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { storage } from "@/services/storage";
import { Button } from "./ui/button";

const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "All Products",
        url: "/products",
        icon: Package,
    },
];

function AppSidebar() {
    const [authToken, setAuthToken] = useState<string | null>(null);

    const [user, setUser] = useState<{
        name: string;
        email?: string;
        avatar?: string;
        role?: string;
    } | null>(null);

    const { toggleSidebar } = useSidebar();

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
        <Sidebar side="right">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarHeader>
                        {authToken ? (
                            <SidebarMenu className="flex flex-row items-center gap-2">
                                <Avatar>
                                    <AvatarImage
                                        src={(user as any)?.avatarUrl}
                                        alt={user?.name || "User"}
                                    />
                                    <AvatarFallback>
                                        {(user?.name?.[0] || "U").toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span>{user?.name}</span>
                            </SidebarMenu>
                        ) : (
                            <Link href="/login">
                                <Button
                                    onClick={toggleSidebar}
                                    variant="secondary"
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </SidebarHeader>

                    {user?.role === "admin" && (
                        <SidebarMenuButton asChild>
                            <Link href="/dashboard">
                                <LayoutDashboard />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    )}

                    <SidebarSeparator />
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    <SidebarSeparator />
                    {authToken && (
                        <SidebarMenuButton
                            className="text-red-500"
                            onClick={() => {
                                storage.clearAll();
                                toggleSidebar();
                            }}
                        >
                            <LogOut /> Logout
                        </SidebarMenuButton>
                    )}
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

export default AppSidebar;
