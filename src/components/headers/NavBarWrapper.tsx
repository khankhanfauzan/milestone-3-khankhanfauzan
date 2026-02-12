import { getUser } from "@/lib/dal";
import { getSession } from "@/lib/session";
import React from "react";
import NavBar from "./NavBar";

async function NavBarWrapper() {
    const session = await getSession();
    const user = await getUser();

    return (
        <>
            <NavBar session={session} user={user} />
        </>
    );
}

export default NavBarWrapper;
