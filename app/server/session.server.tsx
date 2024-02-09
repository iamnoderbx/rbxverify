import { createCookieSessionStorage, redirect } from "@remix-run/node"; // or cloudflare/deno

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

let sessionSecret = "^!&*ujdaYX%^&*X&Xx*(!*XCO$H&*&*(D)!PYhUH!ywlP{LC147*&!$&"

if(!sessionSecret) {
  throw new Error("Session secret is not set!")
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      cookie: {
        name: "__session",

        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: "/",
        sameSite: "lax",
        secrets: [sessionSecret],
        secure: true,
      },
    }
  );

export function getUserSession(request: Request) {
  return getSession(request.headers.get("Cookie"));
}

export async function logout(request : Request) {
  let session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}

export { getSession, commitSession, destroySession };