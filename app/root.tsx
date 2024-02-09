import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Toaster } from "react-hot-toast";
import Header from "./components/header.tsx";
import Footer from "./components/footer.tsx";

//export const links = () => [{ rel: "stylesheet", href: bootstrapCSS }];
import { json } from "@remix-run/node"; // or cloudflare/deno

import styles from "~/styles/bubbles.css";
import Bubbles from "./components/effects/bubbles.tsx";
import { getUserSession } from "./server/session.server.tsx";

import { RemixCreateUser, RemixGetUserFromServer } from "./server/user.server.tsx";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href:  styles}
];

export async function loader({ request, params }: LoaderArgs) {
  const session = await getUserSession(request);
  const isLoggedIn = session.has("userId")
  
  if(isLoggedIn) {
    let user = await RemixGetUserFromServer(session)

    if(!user) {
      user = await RemixCreateUser(session);
    };

    if(user.cookie) {
      return json({user: user}, {
        headers: {
          "Set-Cookie": user.cookie,
        },
      });
    }

    if(!user.profile && !user.cookie) return json({user: undefined})
    return json({user: user});
  };

  return json({user: undefined});
};

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en" data-theme="mytheme">
      <head >
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div><Toaster/></div>
        
        <div className='background z-0'>
          <Bubbles />
          <Header user = {data.user} />
          <Outlet />
        </div>

        <Footer />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
