"use client";

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
} from "../ui/sidebar";
import {
    CircleQuestionMark,
    Home,
    LayoutDashboard,
    LogOut,
    Package,
} from "lucide-react";
import Link from "next/link";
import { logout } from "@/actions/auth";

import { User } from "@/lib/definitions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import type { SessionPayload } from "@/lib/session";

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
    {
        title: "FAQ",
        url: "/faq",
        icon: CircleQuestionMark,
    },
];

type Props = {
    session: SessionPayload | null;
    user: User | null;
};

function AppSidebar({ session, user }: Props) {
    const { toggleSidebar } = useSidebar();

    return (
        <Sidebar side="right">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarHeader>
                        {user ? (
                            <SidebarMenu className="flex flex-row items-center gap-2">
                                <Avatar>
                                    <AvatarImage
                                        src={(user as any)?.avatar}
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
                                <Button variant="secondary">Login</Button>
                            </Link>
                        )}
                    </SidebarHeader>

                    {session?.role === "admin" && (
                        <SidebarMenuButton asChild>
                            <Link href="/admin">
                                <LayoutDashboard />
                                <span>Admin</span>
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
                    {
                        <SidebarMenuButton
                            className="text-red-500"
                            onClick={async () => {
                                logout();
                                toggleSidebar();
                            }}
                        >
                            <LogOut /> Logout
                        </SidebarMenuButton>
                    }
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

export default AppSidebar;
