"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import {
    ChartPieIcon,
    LayoutGridIcon,
    LogOutIcon,
    PackageIcon,
    UserIcon,
} from "lucide-react";
import AppSidebarGroup from "./AppSidebarGroup";
import { logout } from "@/actions/auth";
import AppSideBarUser from "./AppSideBarUser";
import type { User } from "@/lib/definitions";

type AdminSidebarProps = React.ComponentProps<typeof Sidebar> & {
    user: User | null;
};

function AdminSidebar({ user, ...props }: AdminSidebarProps) {
    const sidebarContents = [
        {
            title: "Admin",
            menus: [
                {
                    name: "Dashboard",
                    url: "/admin/dashboard",
                    icon: ChartPieIcon,
                },
                {
                    name: "Products",
                    url: "/admin/products",
                    icon: PackageIcon,
                },
                {
                    name: "Categories",
                    url: "/admin/categories",
                    icon: LayoutGridIcon,
                },
            ],
        },
        {
            title: "Users",
            menus: [{ name: "Users", url: "/admin/users", icon: UserIcon }],
        },
    ];

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <a
                            href="#"
                            className="text-2xl font-black tracking-tight text-white"
                        >
                            Revo<span className="text-blue-500">Shop</span>
                        </a>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <AppSideBarUser user={user} />
            <SidebarContent>
                <AppSidebarGroup items={sidebarContents} />
            </SidebarContent>
            <SidebarSeparator />
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        className="text-red-500"
                        onClick={async () => {
                            logout();
                        }}
                    >
                        <LogOutIcon /> Logout
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </Sidebar>
    );
}

export default AdminSidebar;
