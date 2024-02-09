import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";

import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";

import styles from "~/tailwind.css";
import global from "~/styles/global.css";

export function links() {
    return [{ rel: "stylesheet", href: styles }, { rel: "stylesheet", href: global },];
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: "RBXVerify" },
    { name: "description", content: "A powerful verification bot." },
  ];
};

export async function loader() {
  return json({ ok: 1 });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="flex h-screen">
        <div className="m-auto w-1/2 space-y-4 lg:scale-100">
          <div className="m-auto space-y-4 lg:scale-100 align-middle text-center">

            <div className="stats shadow">
    
              <div className="stat place-items-center bg-base-200">
                <div className="stat-title">Servers</div>
                <div className="stat-value">32</div>
                <div className="stat-desc">How many servers use RBXVerify?</div>
              </div>
              
              <div className="stat place-items-center bg-base-200">
                <div className="stat-title">Users</div>
                <div className="stat-value text-primary">4,200</div>
                <div className="stat-desc">That is a whole lot of users!</div>
              </div>
              
              <div className="stat place-items-center bg-base-200">
                <div className="stat-title">Verifications</div>
                <div className="stat-value">1,200</div>
                <div className="stat-desc">How many unique verifications?</div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
