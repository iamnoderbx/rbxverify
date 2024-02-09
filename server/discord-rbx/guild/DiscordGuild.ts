import { Guild } from "discord.js";
import { DiscordUser } from "../user/DiscordUser.ts";

export class DiscordGuild {
    guild: Guild;
    members: Map<string, DiscordUser>;
    
    constructor(guild : Guild) {
        this.guild = guild;
        this.members = new Map();
    }
    
    getDiscordMember(id: string) {
        if(!this.members.get(id)) {
            const member = this.guild.members.cache.get(id);
            if(!member) return;

            this.members.set(id, new DiscordUser(member, this));
        };

        return this.members.get(id);
    }
};