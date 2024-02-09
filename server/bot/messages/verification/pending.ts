import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

export function PendingVerificationMessage(verificationURL : string) {
    const button = new ButtonBuilder()
        .setURL(verificationURL)
        .setLabel('Verify')
        .setStyle(ButtonStyle.Link)

    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(button);

    const response = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Roblox Verification')
        .setDescription('If you would like to link your ROBLOX account to this discord server then please press the button below.')
        .setFooter({text: "This link will expire in 5 minutes."})

    return { embeds: [response], components: [row], ephemeral: true }
}