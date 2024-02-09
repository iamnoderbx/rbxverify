import { OutgoingVerification } from "server/discord-rbx/user/OutgoingVerification.ts";
import { DynamicLink } from "server/linked/DynamicLink.ts";

enum VerificationType {
    Discord = 1,
    Roblox = 2,
}

class VerificationLink extends DynamicLink {
    token: string;
    verification: OutgoingVerification | undefined;
    VerificationType: VerificationType | undefined;
    profileLogin: boolean | undefined;

    constructor(token : string) {
        super();
        this.token = token;
        this.VerificationType = VerificationType.Discord;
    };

    isProfileLogin(value : boolean) {
        console.log('updaitng profile login:', value, this.token)
        this.profileLogin = value;
    }

    assignOutgoingVerification(verification : OutgoingVerification) {
        this.verification = verification;
    };

    getOutgoingVerification() {
        return this.verification;
    };

    async getRobloxVerificationDataFromAuth(auth: string) {
        if(!this.verification) return;
        return await this.verification.getRobloxVerificationDataFromAuth(auth)
    }

    async getDiscordVerificationDataFromAuth(auth: string) {
        if(!this.verification) return;
        return await this.verification.getDiscordVerificationDataFromAuth(auth);
    }

    createDiscordAuthLink() {
        if(!this.verification) return;
        return this.verification.createDiscordAuthLink();
    }

    createRobloxAuthLink() {
        this.VerificationType = VerificationType.Roblox;

        if(!this.verification) return;
        return this.verification.createRobloxAuthLink();
    }
};

export { VerificationLink, VerificationType }