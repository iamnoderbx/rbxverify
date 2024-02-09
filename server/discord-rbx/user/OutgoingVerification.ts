import LinkedHandler from "server/linked/LinkedHandler.ts";
import { DiscordUser } from "./DiscordUser.ts";
import {v4} from 'uuid';
import { VerificationLink } from "server/linked/linked_types/VerificationLink.ts";

import request from 'request-promise';
import { RobloxUser } from "./roblox/RBXUser.ts";
import { RobloxAuthentication } from "server/authentications/Roblox.tsx";
import { DiscordAuthentication } from "server/authentications/Discord.tsx";

const AUTH_ENDPOINT = 'https://apis.roblox.com/oauth/v1/authorize'
const TOKEN_ENDPOINT = 'https://apis.roblox.com/oauth/v1/token'
const USER_ENDPOINT = 'https://apis.roblox.com/oauth/v1/userinfo'

const AUTH_CLIENT_ID = ''
const AUTH_SECRET = ''

const AUTH_REDIRECT = 'https://rbxverify.com/redirect'
const SUCCESS_REDIRECT = 'https://rbxverify.com/success'

const TIMEOUT = 1000 * 60 * 5;

export class OutgoingVerification {
    user: DiscordUser | undefined;
    uuid: any;
    link: VerificationLink;
    id: number | undefined;
    promise: Promise<RobloxUser>;
    
    promise_resolve: ((value: RobloxUser) => void) | undefined;
    rbxAuth: RobloxAuthentication | undefined;
    discordAuth: DiscordAuthentication | undefined;
    profileLogin: boolean | undefined;
    //private _promise_reject: (reason?: any) => void;

    constructor(user : DiscordUser | undefined) {
        this.user = user;
        this.uuid = this.generateTocken(60);

        this.promise = new Promise<RobloxUser>((resolve, reject) => {
            this.promise_resolve = resolve;

            setTimeout(() => {
                reject({error: "Verification has timed out!"});
            }, TIMEOUT);
        });

        this.link = new VerificationLink(this.uuid)
        this.link.assignOutgoingVerification(this);

        LinkedHandler.createDynamicLink(this.link);
    };

    verified() {
        return this.promise
    }

    setProfileLogin(val : boolean) {
        this.profileLogin = val;
    }

    generateTocken(n : number) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var token = '';
        for(var i = 0; i < n; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }
        return token;
    }

    createDiscordAuthLink() {
        this.discordAuth = new DiscordAuthentication(this);
        return this.discordAuth.getRedirectLink();
    }

    async getDiscordVerificationDataFromAuth(auth: string) {
        if(!this.discordAuth) return;
        return this.discordAuth.getVerificationDataFromAuth(auth);
    }

    async getRobloxVerificationDataFromAuth(auth: string) {
        if(!this.rbxAuth) return;
        return this.rbxAuth.getVerificationDataFromAuth(auth);
    };

    createRobloxAuthLink() {
        this.rbxAuth = new RobloxAuthentication(this);
        return this.rbxAuth.getRedirectLink();
    }

    getURL() {
        return 'https://rbxverify.com/link/' + this.uuid;
    }

    getUser() {
        return this.user;
    }
    
    getMember() {
        if(!this.user) return;
        return this.user.member;
    }
};