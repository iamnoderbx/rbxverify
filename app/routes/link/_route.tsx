import { Outlet } from "@remix-run/react";

import linkStyles from "~/styles/link/link.css";
import styles from "~/styles/global.css";

export function links() {
  return [
    { rel: "stylesheet", href: linkStyles },
    { rel: "stylesheet", href: styles },
  ];
}

export default function Link() {
  return (
    <div>
      <Outlet />
    </div>
  );
}