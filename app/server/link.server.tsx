import { LinkedHandler, DynamicLink } from "server/linked/LinkedHandler.ts";
import { VerificationLink } from "server/linked/linked_types/VerificationLink.ts";
import { VerificationType } from "server/linked/linked_types/VerificationLink.ts";
import { OutgoingVerification } from "server/discord-rbx/user/OutgoingVerification.ts";

export function RemixDynamicLinkServer(link_id: string) {
    return LinkedHandler.getDynamicLink(link_id);
}

export function RemixCreateDynamicLink(link: DynamicLink) {
    return LinkedHandler.createDynamicLink(link)
}

export { VerificationLink, VerificationType, OutgoingVerification }