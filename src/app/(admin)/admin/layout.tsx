import AdminHeader from "@/components/headers/AdminHeader";
import AdminSidebar from "@/components/sidebars/AdminSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUser, requireRole } from "@/lib/dal";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await requireRole(["admin"]);
    const user = await getUser();

    return (
        <>
            <SidebarProvider>
                <AdminSidebar variant="inset" user={user} />
                <SidebarInset>
                    <AdminHeader />
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
