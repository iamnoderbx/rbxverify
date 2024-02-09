import { isRouteErrorResponse } from "@remix-run/react";
import DiscordRedirectButton from "./buttons/discord.tsx";

export function DisplayError({
    error,
}: {
    error: any;
}) {
    const isExpectedError = isRouteErrorResponse(error)
    const header = (error.status == 404 && "Invalid Token") || "Critical Error"
    const message = (error.data || "An unknown error occured, please try again!")
    const body = error.body || "The application has run in to an error! You can see the details above, for more information or support please join our discord server!"

    return (
        <div className="flex h-screen">
            <div className="m-auto w-2/5 space-y-4 lg:scale-125">
                {!error.hideHeader &&
                    <div className="alert border-1 border-primary bg-base-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-6 w-6 stroke-primary" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <div>
                            <h3 className="font-bold text-primary">Notice</h3>
                            <div className="text-xs">{message}</div>
                        </div>
                    </div>
                }

                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-neutral-300 text-base">Well, that's awkward...</h2>
                        <p className="text-neutral-400 text-sm">{body}</p>
                        {!error.hideSupport &&
                            <div className="card-actions justify-end">
                                <DiscordRedirectButton/>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}