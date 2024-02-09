import { LoaderArgs, redirect } from "@remix-run/node";
import { useRouteError } from "@remix-run/react";
import { DisplayError } from "../components/error.tsx";

import { RemixDynamicLinkServer, VerificationLink, VerificationType } from "~/server/link.server.tsx";
import { commitSession, getUserSession } from "~/server/session.server.tsx";
import { RemixCreateUser } from "~/server/user.server.tsx";

async function HandleDiscordProfileLogin(session: any, VerificationLink: VerificationLink, authToken: string, state: string) {
  const DiscordInformation = await VerificationLink.getDiscordVerificationDataFromAuth(authToken);
  session.set("userId", DiscordInformation.id);

  await RemixCreateUser(session)

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

async function HandleDiscordLoginRedirect(session: any, VerificationLink: VerificationLink, authToken: string, state: string) {
  const DiscordInformation = await VerificationLink.getDiscordVerificationDataFromAuth(authToken);
  session.set("userId", DiscordInformation.id);

  await RemixCreateUser(session)

  return redirect("/link/" + state, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

async function HandleRobloxLoginRedirect(session: any, VerificationLink: VerificationLink, authToken: string, state: string) {
  if (!session.has("userId")) {
    return redirect("/link/" + state);
  };

  await VerificationLink.getRobloxVerificationDataFromAuth(authToken);
  return redirect("/success/" + state);
}

export async function loader({ params, request  }: LoaderArgs) {
  if(!request) throw new Response("Internal Server Error!", { status: 404 })

  const session = await getUserSession(request);
  const url = new URL(request.url);
  
  const authToken = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if(!authToken || !state) throw new Response("The specified token does not exist!", { status: 404 })

  const VerificationLink : VerificationLink = RemixDynamicLinkServer(state);
  if(!VerificationLink) return redirect('/');
  
  if(VerificationLink.getOutgoingVerification()?.profileLogin) {
    return HandleDiscordProfileLogin(session, VerificationLink, authToken, state);
  }

  switch(VerificationLink.VerificationType) {
    case(VerificationType.Discord):
      return HandleDiscordLoginRedirect(session, VerificationLink, authToken, state);
    case(VerificationType.Roblox):
      return HandleRobloxLoginRedirect(session, VerificationLink, authToken, state);
  };

  return
}

export function ErrorBoundary() {
  const error = useRouteError();
  return <DisplayError error = {error}/>;
};