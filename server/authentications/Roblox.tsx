import { RobloxUser } from "server/discord-rbx/user/roblox/RBXUser.ts"

import request from 'request-promise';
import { OutgoingVerification } from "server/discord-rbx/user/OutgoingVerification.ts";
import { DiscordUser } from "server/discord-rbx/user/DiscordUser.ts";

const AUTH_ENDPOINT = 'https://apis.roblox.com/oauth/v1/authorize'
const TOKEN_ENDPOINT = 'https://apis.roblox.com/oauth/v1/token'
const USER_ENDPOINT = 'https://apis.roblox.com/oauth/v1/userinfo'

const AUTH_CLIENT_ID = ''
const AUTH_SECRET = ''

const AUTH_REDIRECT = 'https://rbxverify.com/redirect'
const SUCCESS_REDIRECT = 'https://rbxverify.com/success'

export class RobloxAuthentication {
    uuid: string
    id: any;
    user : DiscordUser | undefined
    
    private _promise_resolve: ((value: RobloxUser) => void) | undefined;

    constructor(verification : OutgoingVerification) {
        this.uuid = verification.uuid;
        this.user = verification.user;
        this._promise_resolve = verification.promise_resolve;
    };

    async getVerificationDataFromAuth(auth: string) {
        const access_token = await request({
            method: 'POST',
            uri: TOKEN_ENDPOINT,
            form: {
                grant_type: 'authorization_code',
                code: auth,
                client_id: AUTH_CLIENT_ID,
                client_secret: AUTH_SECRET,
                redirect_uri: SUCCESS_REDIRECT
            },
            json: true
        })

        const info = await request.get(USER_ENDPOINT, {
            headers: { Authorization: 'Bearer ' + access_token.access_token},
            json: true
        })
        
        if(!info.sub || !this._promise_resolve) return;
        
        this.id = info.sub;
        
        if(this.user == undefined) return;

        const user = new RobloxUser(this.user, info.sub);
        await user.createUserProfile();

        this._promise_resolve(user);

        return {user: info.sub};
    }

    getRedirectLink() {
        const queryParams = new URLSearchParams({
            client_id: AUTH_CLIENT_ID,
            redirect_uri: AUTH_REDIRECT,
            response_type: 'code',
            prompts: 'select_account,consent',
            scope: 'openid',
            state: this.uuid,
        })

        let url = decodeURIComponent(`${AUTH_ENDPOINT}?${queryParams}`)
        return url;
    };
}