import request from "request-promise";
import { DataKey, DataTableTypes, Database } from "server/database/database.tsx";
import { DynamicLink } from "server/linked/DynamicLink.ts";
import LinkedHandler from "server/linked/LinkedHandler.ts";

const USER_ENDPOINT = 'https://discord.com/api/users/@me'
const GUILD_ENDPOINT = 'https://discord.com/api/users/@me/guilds'

export class WebsiteProfile extends DynamicLink {
    token: string | undefined | null;
    profile: any | undefined;
    guilds: any;
    timeout: NodeJS.Timeout | undefined | null;

    constructor(token : string) {
        super();
        this.token = token;
    }

    private async getUserData() {
        if(!this.token) return;

        const DatabaseKey = new DataKey(DataTableTypes.USERS)
            .value(this.token.toString());

        const user_info = await Database.get(DatabaseKey)
        if(!user_info) return;

        return user_info
    }

    async setTimeoutLength(seconds : number) {
        if(this.timeout) {
            clearTimeout(this.timeout);
        };
        
        this.timeout = setTimeout(() => {
            LinkedHandler.collection.delete(this.token);

            this.token = null;
            this.profile = null;
            this.guilds = null;
            this.timeout = null;
        }, seconds * 1000);

        
    }

    async getUserGuilds() {
        if(this.guilds) {
            if(((Date.now() / 1000) - this.guilds.REFRESH) < (5 * 60)) return this.guilds;
        };

        this.guilds = {};
        this.guilds.REFRESH = Date.now() / 1000;

        const user_info = await this.getUserData();
        const guilds = await request.get(GUILD_ENDPOINT, {
            headers: { Authorization: 'Bearer ' + user_info.auth_token.access_token},
            json: true
        })
        
        const adminGuilds = guilds.filter((obj: any) => {
            return ((obj.permissions & 0x8) == 0x8)
        });;

        this.guilds.CAN_MODIFY = [];

        const client = __serverHandler.bot.client;
        
        const can_modify = adminGuilds.filter((obj: any) => {
             return (client.guilds.cache.has(obj.id))
        });;

        can_modify.forEach((guild : any, index : number) => {
            const server = __serverHandler.bot.rbxdiscord?.getDiscordServer(guild.id);
            this.guilds.CAN_MODIFY.push(server);
        });

        return this.guilds
    }

    async createProfileData() {
        const user_info = await this.getUserData();

        const info = await request.get(USER_ENDPOINT, {
            headers: { Authorization: 'Bearer ' + user_info.auth_token.access_token},
            json: true
        })

        this.profile = info;
        return this.profile
    }
};