import { useLoaderData, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";

import { VerificationDisplay } from "./display.tsx";
import { RemixDynamicLinkServer, VerificationLink } from "~/server/link.server.tsx";
import { DisplayError } from "~/components/error.tsx";

import { getUserSession, commitSession  } from "~/server/session.server.tsx";

import styles from "~/tailwind.css";

import { json } from "@remix-run/node"; // or cloudflare/deno
import { VerificationDiscordLogin } from "./login.tsx";

export function links() {
    return [{ rel: "stylesheet", href: styles }];
}

export async function loader({ request, params }: LoaderArgs) {
    const session = await getUserSession(request);
    if(!params.linkId) return;

    const VerificationLink : VerificationLink = RemixDynamicLinkServer(params.linkId);

    if(VerificationLink == undefined) {
        throw new Response("The token specified does not exist, please attempt to reverify and try again!", { status: 404 })
    };

    const outgoingVerification = VerificationLink.getOutgoingVerification();
    const member = outgoingVerification?.getMember();

    if (!session.has("userId")) {
        return json({
            error: "Not logged in.", 
            user: member?.user,
            redirect: VerificationLink.createDiscordAuthLink(),
        }, {
            headers: {
              "Set-Cookie": await commitSession(session),
            },
        });
    };

    if(session.get("userId") != outgoingVerification?.getUser()?.member.id) {
        throw new Response("You do not have access to this login token!", { status: 404 })
    }

    return json({
        user: member?.user,
        token: outgoingVerification?.uuid,
        redirect: VerificationLink.createRobloxAuthLink(),
    });
};

export default function displayLink() {
    const data : any = useLoaderData<typeof loader>();
    
    switch(data.error) {
        case "Not logged in.":
            return <VerificationDiscordLogin verification = {data}/>;
        default:
            return <VerificationDisplay verification = {data}/>;
    }
}

export function ErrorBoundary() {
    const error = useRouteError();
    return <DisplayError error = {error}/>;
};