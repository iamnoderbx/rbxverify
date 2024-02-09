import { Outlet, useLoaderData } from "@remix-run/react";

import { v4 as uuidv4 } from 'uuid';

import linkStyles from "~/styles/link/link.css";
import styles from "~/styles/global.css";
import tailwind from "~/tailwind.css";
import DiscordLoginButton from "~/components/buttons/login.tsx";
import { LoaderArgs, json, redirect } from "@remix-run/node";
import { getSession } from "~/server/session.server.tsx";

import { OutgoingVerification, RemixCreateDynamicLink, VerificationLink } from "~/server/link.server.tsx";

export function links() {
  return [
    { rel: "stylesheet", href: linkStyles },
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: tailwind },
  ];
}

export async function loader({ request, params }: LoaderArgs) {
  const session = await getSession(
      request.headers.get("Cookie")
  );

  if (session.has("userId")) {
    return redirect('/');
  };

  const token = uuidv4();
  const Verification = new VerificationLink(token);
  const outgoingVerification = new OutgoingVerification(undefined);

  Verification.assignOutgoingVerification(outgoingVerification);
  outgoingVerification.setProfileLogin(true);
  
  RemixCreateDynamicLink(Verification)

  const redirect_link = Verification.createDiscordAuthLink();
  if(!redirect_link) return;

  return json({redirect: redirect_link});
};

export default function Success() {
  const data : any = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen">
        <div className="m-auto w-1/2 space-y-4 lg:scale-100">
            <div className="alert border-1 border-primary bg-base-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-6 w-6 stroke-primary" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div>
                    <h3 className="font-bold text-primary">Notice</h3>
                    <div className="text-xs">We request access to view your discord servers, as well as profile information!</div>
                </div>
            </div>
            
            <div className="m-auto space-y-4 lg:scale-100">
                <div className="card card-side bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h1 className="card-title text-2xl">
                            Login
                        </h1>
                        <p className = "font-light">Please login through discord by clicking the button below! We require basic information on your discord account in order to verify you!</p>
                        <div className="card-actions justify-end">
                            <DiscordLoginButton auth = {data.redirect}/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}