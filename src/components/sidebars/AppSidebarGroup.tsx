import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";
import { LucideIcon } from "lucide-react";

function AppSidebarGroup({
    items,
}: {
    items: {
        title: string;
        menus: {
            name: string;
            url: string;
            icon: LucideIcon;
        }[];
    }[];
}) {
    return (
        <>
            {items.map((item) => (
                <SidebarGroup
                    key={item.title}
                    className="group-data-[collapsible=icon]:hidden"
                >
                    <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                    <SidebarGroupContent className="flex flex-col gap-2">
                        <SidebarMenu>
                            {item.menus.map((menu) => (
                                <SidebarMenuItem key={menu.name}>
                                    <SidebarMenuButton
                                        tooltip={menu.name}
                                        asChild
                                    >
                                        <a href={menu.url}>
                                            {menu.icon && <menu.icon />}
                                            <span>{menu.name}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            ))}
        </>
    );
}

export default AppSidebarGroup;
