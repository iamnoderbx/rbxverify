import { Client } from "discord.js";
import { DiscordGuild } from "./guild/DiscordGuild.ts";

class RBXDiscord {
    servers = new Map();
    client: Client<boolean>;

    constructor(client: Client<boolean>) {
        this.client = client;
    }
 
    getDiscordServer(id : string) {
        if(!this.servers.has(id)) {
            const guild = this.client.guilds.cache.get(id);
            if(!guild) return;
            
            this.servers.set(id, new DiscordGuild(guild));
        };
        
        return this.servers.get(id);
    };
};

export { RBXDiscord }