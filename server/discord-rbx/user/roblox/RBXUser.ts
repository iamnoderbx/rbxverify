import request from "request-promise";
import { DiscordUser } from "../DiscordUser.ts";

export class RobloxUser {
    id: number;
    discord: DiscordUser;
    profile: any;

    constructor(user : DiscordUser, id: number) {
        this.discord = user;
        this.id = id;

        user.assignRobloxUser(this);
    }

    async getProfileInformation() {
        if(!this.profile) {
            await this.createUserProfile();
        };

        return this.profile;
    }

    async createUserProfile() {
        this.profile = await request({
            method: 'GET',
            uri: 'https://users.roblox.com/v1/users/' + this.id,
            json: true
        })

        return this.profile;
    }
};