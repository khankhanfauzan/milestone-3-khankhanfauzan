import Footer from "@/components/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebarWrapper from "@/components/sidebars/AppSidebarWrapper";
import NavBarWrapper from "@/components/headers/NavBarWrapper";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebarWrapper />
            <main className="w-full min-h-screen flex flex-col">
                <NavBarWrapper />
                <div className="flex-1">{children}</div>
                <Footer />
            </main>
        </SidebarProvider>
    );
}
