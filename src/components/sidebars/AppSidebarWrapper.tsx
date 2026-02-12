import { getUser } from "@/lib/dal";
import { getSession } from "@/lib/session";
import AppSidebar from "./AppSidebar";

async function AppSidebarWrapper() {
    const session = await getSession();
    const user = await getUser();

    return (
        <>
            <AppSidebar session={session} user={user} />
        </>
    );
}

export default AppSidebarWrapper;
