import { LinkedHandler } from "server/linked/LinkedHandler.ts";
import { WebsiteProfile } from "server/webuser/WebsiteProfile.tsx";
import { commitSession } from "./session.server.tsx";

export async function RemixGetObjectUserFromServer(session : any) {
    const user_id = session.get('userId')
    if(!user_id) return;

    if(LinkedHandler.getDynamicLink(user_id)) {
        return LinkedHandler.getDynamicLink(user_id)
    }

    const DynamicLink = new WebsiteProfile(user_id);
    await DynamicLink.createProfileData();

    LinkedHandler.createDynamicLink(DynamicLink);

    return DynamicLink
}

export async function RemixGetUserFromServer(session : any) {
    const user_id = session.get('userId')
    if(!user_id) return;
    
    const user = session.get('__user');

    if(!user) {
        return await RemixCreateUser(session);
    };

    return user;
}

export async function RemixCreateUser(session : any) {
    const user_id = session.get('userId')
    
    const DynamicLink = new WebsiteProfile(user_id);
    await DynamicLink.createProfileData();

    session.set('__user', DynamicLink)
    const cookie = await commitSession(session);

    return {cookie: cookie, user: DynamicLink};
}

export { WebsiteProfile }