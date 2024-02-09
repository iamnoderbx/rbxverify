import { DynamicLink } from "server/linked/DynamicLink.ts";
import LinkedStatus from "./LinkStatus.ts";
import { DiscordLink } from "./linked_types/DiscordLink.ts";

class InternalLinkedHandler {
    collection = new Map();

    createDynamicLink(link : DynamicLink) {
        this.collection.set(link.token, link);
    };

    getDynamicLink(token : string | undefined) {
        return this.collection.get(token);
    };
};

let LinkedHandler: InternalLinkedHandler;

declare global {
    var __linkedHandler: InternalLinkedHandler | undefined;
}


if (!global.__linkedHandler || global.__linkedHandler == undefined ) {
    global.__linkedHandler = new InternalLinkedHandler();
}

LinkedHandler = global.__linkedHandler;

export { LinkedHandler, LinkedStatus, DynamicLink, DiscordLink };
export default LinkedHandler;