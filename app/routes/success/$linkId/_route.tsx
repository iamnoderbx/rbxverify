import { useLoaderData, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";

import { RemixDynamicLinkServer, VerificationLink } from "~/server/link.server.tsx";
import { DisplayError } from "~/components/error.tsx";

import styles from "~/tailwind.css";

import { json } from "@remix-run/node"; // or cloudflare/deno
import { SuccessVerificationDisplay } from "./display.tsx";
import { getUserSession } from "~/server/session.server.tsx";

export function links() {
    return [{ rel: "stylesheet", href: styles }];
}

export async function loader({ request, params }: LoaderArgs) {
    if(!params.linkId) return;
    
    const session = await getUserSession(request)
    
    const VerificationLink : VerificationLink = RemixDynamicLinkServer(params.linkId);
    if(VerificationLink == undefined) {
        throw new Response("The token specified does not exist, please attempt to reverify and try again!", { status: 404 })
    };

    const doesNotOwnToken = !session.has("userId") || session.get("userId") != VerificationLink.getOutgoingVerification()?.getMember()?.user.id;
    if (doesNotOwnToken) throw new Response("You do not have access to this token!");

    const outgoingVerification = VerificationLink.getOutgoingVerification();
    const member = outgoingVerification?.getMember();

    const user = outgoingVerification?.getUser();
    const roblox = await user?.getRobloxUser()?.getProfileInformation();

    if(!roblox) throw new Response("This token is currently in process, and has not been fulfilled!", { status: 404 })

    return json({
        user: member?.user,
        roblox: roblox,
    });
};

export default function displayLink() {
    const data = useLoaderData<typeof loader>();
    return <SuccessVerificationDisplay verification = {data}/>;
}

export function ErrorBoundary() {
    const error = useRouteError();
    return <DisplayError error = {error}/>;
};