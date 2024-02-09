import { DynamicLink } from "server/linked/DynamicLink.ts";

class DiscordLink extends DynamicLink {
    token: string;

    constructor(token : string) {
        super();
        this.token = token;
    };
};

export { DiscordLink }