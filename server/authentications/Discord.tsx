import { RobloxUser } from "server/discord-rbx/user/roblox/RBXUser.ts"

import request from 'request-promise';
import { OutgoingVerification } from "server/discord-rbx/user/OutgoingVerification.ts";
import { DiscordUser } from "server/discord-rbx/user/DiscordUser.ts";
import { DataKey, DataTableTypes, Database } from "server/database/database.tsx";

const AUTH_ENDPOINT = 'https://discord.com/oauth2/authorize'
const TOKEN_ENDPOINT = 'https://discord.com/api/oauth2/token'
const USER_ENDPOINT = 'https://discord.com/api/users/@me'

const AUTH_CLIENT_ID = ''
const AUTH_SECRET = ''

const AUTH_REDIRECT = 'https://rbxverify.com/redirect'

export class DiscordAuthentication {
    uuid: string
    id: any;
    user : DiscordUser | undefined
    user_info: any;
    
    constructor(verification : OutgoingVerification) {
        this.uuid = verification.uuid;
        this.user = verification.user;
    };

    async getVerificationDataFromAuth(auth: string) {
        console.log("REDIRECT AUTH IS:", auth);

        const access_token = await request({
            method: 'POST',
            uri: TOKEN_ENDPOINT,
            form: {
                grant_type: 'authorization_code',
                code: auth,
                client_id: AUTH_CLIENT_ID,
                client_secret: AUTH_SECRET,
                redirect_uri: AUTH_REDIRECT
            },
            json: true
        })

        try {
            const info = await request.get(USER_ENDPOINT, {
                headers: { Authorization: 'Bearer ' + access_token.access_token},
                json: true
            }).catch(function(){
                return {error: 'Invalid Token'}
            });

            if(info.error) return info;

            const DatabaseKey = new DataKey(DataTableTypes.USERS)
                .value(info.id.toString());

            await Database.set(DatabaseKey, {
                auth_token: access_token
            });

            this.user_info = info;
        } catch(err) {
            return {error: 'Invalid Token'}
        };

        return this.user_info;
    }

    getRedirectLink() {
        const queryParams = new URLSearchParams({
            client_id: AUTH_CLIENT_ID,
            redirect_uri: AUTH_REDIRECT,
            response_type: 'code',
            prompts: 'consent',
            scope: 'identify%20guilds',
            state: this.uuid,
        })

        let url = decodeURIComponent(`${AUTH_ENDPOINT}?${queryParams}`)
        return url;
    };
}