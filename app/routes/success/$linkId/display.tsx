import { toast, Toaster } from "react-hot-toast";

import PrimaryButton from "~/components/buttons/primary.tsx";
import { ToastSylization } from "~/styles/toast.ts";

export function SuccessVerificationDisplay({
    verification,
}: {
    verification: any;
}) {
    const url = `https://cdn.discordapp.com/avatars/${verification.user.id}/${verification.user.avatar}.png?size=256`
    
    return (
        <div className="flex h-screen">
            <div className="m-auto w-1/2 space-y-4 lg:scale-100">
                <div className="alert border-1 border-success bg-base-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-success shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div>
                        <h3 className="font-bold text-success">Success!</h3>
                        <div className="text-xs">Your verification has been successful!</div>
                    </div>
                </div>

                <div className="m-auto space-y-4 lg:scale-100">
                    <div className="card card-side bg-base-200 shadow-xl">
                        <figure className="aspect-square"><img src={url} className = "h-full"/></figure>
                        <div className="card-body">
                            <h1 className="card-title text-2xl">
                                {verification.user.username}
                                <div className="badge bg-neutral-300 text-base-200">{verification.user.discriminator}</div>
                            </h1>
                            <p className = "font-light">You have successfully verified your discord account to the roblox account {verification.roblox.name}!</p>
                            <div className="card-actions justify-end">
                                <PrimaryButton/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}