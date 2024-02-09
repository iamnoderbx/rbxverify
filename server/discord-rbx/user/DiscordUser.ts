import { GuildMember } from "discord.js"
import { OutgoingVerification } from "./OutgoingVerification.ts";
import { DiscordGuild } from "../guild/DiscordGuild.ts";
import { RobloxUser } from "./roblox/RBXUser.ts";

export class DiscordUser {
    member: GuildMember;
    outgoingVerification: OutgoingVerification | undefined;
    guild: DiscordGuild;
    roblox: RobloxUser | undefined;

    constructor(member : GuildMember, guild : DiscordGuild ) {
        this.member = member;
        this.guild = guild;
    };

    getRobloxUser() {
        return this.roblox;
    }

    assignRobloxUser(roblox : RobloxUser) {
        this.roblox = roblox;
    }

    createOutgoingVerification() {
        this.outgoingVerification = new OutgoingVerification(this);
        return this.outgoingVerification
    }

    getNickname() {
        return this.member.nickname || this.member.user.username;
    }
};