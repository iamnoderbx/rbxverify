import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { logout } from "~/server/session.server.tsx";

export let action: ActionFunction = async ({ request }) => {
    return logout(request);
};

export let loader: LoaderFunction = async () => {
    return redirect("/");
};