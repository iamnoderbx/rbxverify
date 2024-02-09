import { Toaster } from "react-hot-toast";
import DiscordLoginButton from "~/components/buttons/login.tsx";
import VerifyButton from "~/components/buttons/verify.tsx";

export function VerificationDiscordLogin({
    verification,
}: {
    verification: any;
}) {
    const url = `https://cdn.discordapp.com/avatars/${verification.user.id}/${verification.user.avatar}.png?size=256`

    return (
        <div className="flex h-screen">
            <div className="m-auto w-1/2 space-y-4 lg:scale-100">
                <div className="alert border-1 border-primary bg-base-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-6 w-6 stroke-primary" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div>
                        <h3 className="font-bold text-primary">Notice</h3>
                        <div className="text-xs">Please log in to discord in order to continue!</div>
                    </div>
                </div>
                
                <div className="m-auto space-y-4 lg:scale-100">
                    <div className="card card-side bg-base-200 shadow-xl">
                        <figure><img src={url}/></figure>
                        <div className="card-body">
                            <h1 className="card-title text-2xl">
                                {verification.user.username}
                                <div className="badge bg-neutral-300 text-base-200">{verification.user.discriminator}</div>
                            </h1>
                            <p className = "font-light">Woah! Hold on just a second, we need to verify that this is actually you!</p>
                            <div className="card-actions justify-end">
                                <DiscordLoginButton auth = {verification.redirect}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}