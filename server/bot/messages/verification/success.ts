import { EmbedBuilder } from "discord.js";

export function SuccessVerificationMessage(username : string) {
    const response = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Roblox Verification')
        .setDescription('You have successfully linked your discord to the roblox account ' + username + "!")

    return { embeds: [response], components: [], ephemeral: true }
}