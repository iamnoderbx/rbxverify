import { LoaderArgs, V2_MetaFunction, redirect } from "@remix-run/node";

import { json } from "@remix-run/node"; // or cloudflare/deno
import { Outlet, useLoaderData } from "@remix-run/react";

import styles from "~/tailwind.css";
import global from "~/styles/global.css";
import { getUserSession } from "~/server/session.server.tsx";
import { RemixGetObjectUserFromServer, RemixGetUserFromServer, WebsiteProfile } from "~/server/user.server.tsx";

import { memoryUsage } from 'node:process';

export function links() {
    return [{ rel: "stylesheet", href: styles }, { rel: "stylesheet", href: global },];
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: "RBXVerify" },
    { name: "description", content: "A powerful verification bot." },
  ];
};

export async function loader({ request, params }: LoaderArgs) {
    const session = await getUserSession(request);
    if (!session.has("userId")) {
        return redirect('/')
    };

    const user: WebsiteProfile  = await RemixGetObjectUserFromServer(session);
    user.setTimeoutLength(60 * 15);
    
    const guilds = await user.getUserGuilds();
    const user_id = session.get("userId");

    const owned = guilds.CAN_MODIFY.filter((guild: any) => {
        return (guild.guild.ownerId == user_id)
    });

    const other = guilds.CAN_MODIFY.filter((guild: any) => {
        return (guild.guild.ownerId != user_id)
    });;

    return json({ guilds: other, owned: owned, all: guilds.CAN_MODIFY});
}

export default function Index() {
    const data = useLoaderData<typeof loader>();

    const ownedServers = data.owned.map((guild : any) =>
        <li key={guild.guild.id}><a href={"../servers/" + guild.guild.id}>{guild.guild.name}</a></li>
    );

    const nonOwnedServers = data.guilds.map((guild : any) =>
         <li key={guild.guild.id}><a href={"../servers/" + guild.guild.id}>{guild.guild.name}</a></li>
    );

    return (
        <div className="drawer lg:drawer-open shadow-lg w-full">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex-1 min-w-full z-10 space-y-4 lg:scale-100 bg-transparent">
                <Outlet context={[data.all]}/>
            </div>
            <div className="drawer-side shadow-[0_0px_40px_8px_rgba(0,0,0,0.9)] z-20">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 

                <ul className="menu p-4 w-80 h-full bg-[#141414] text-base-content">
                    <div className="bg-inherit sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex shadow-sm">
                        <a href="/" aria-current="page" aria-label="Homepage" className="flex-0 btn btn-ghost px-2">
                            <div className="text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
                                <span className="lowercase">rbx</span>
                                <span className="text-base-content capitalize">Verify</span>
                            </div>
                        </a>
                    </div>

                    <div className="menu menu-sm lg:menu-md px-4 py-0">
                        {/* Sidebar content here */}
                        <li className="menu-title flex flex-row gap-4">
                            <span className="text-base-content">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-400"><path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"></path><path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"></path></svg>
                            </span>
                            <span>Your Servers</span>
                        </li>
                        
                        {ownedServers}
                    </div>

                    <div className="menu menu-sm lg:menu-md px-4 py-0">
                        {/* Sidebar content here */}
                        <li></li>
                        <li className="menu-title flex flex-row gap-4">
                            <span className="text-base-content">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-200">
                                    <path fillRule="evenodd" d="M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 1zM5.05 3.05a.75.75 0 011.06 0l1.062 1.06A.75.75 0 116.11 5.173L5.05 4.11a.75.75 0 010-1.06zm9.9 0a.75.75 0 010 1.06l-1.06 1.062a.75.75 0 01-1.062-1.061l1.061-1.06a.75.75 0 011.06 0zM3 8a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 013 8zm11 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0114 8zm-6.828 2.828a.75.75 0 010 1.061L6.11 12.95a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm3.594-3.317a.75.75 0 00-1.37.364l-.492 6.861a.75.75 0 001.204.65l1.043-.799.985 3.678a.75.75 0 001.45-.388l-.978-3.646 1.292.204a.75.75 0 00.74-1.16l-3.874-5.764z" clipRule="evenodd"></path>
                                </svg>
                            </span>
                            <span>Server List</span>
                        </li>
                        {nonOwnedServers}
                    </div>
                </ul>
            </div>
        </div>
    );
}
