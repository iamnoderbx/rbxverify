import BaseCommand from 'server/bot/utils/commands-util/BaseCommand.ts'
import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { DiscordGuild } from 'server/discord-rbx/guild/DiscordGuild.ts';
import { DiscordUser } from 'server/discord-rbx/user/DiscordUser.ts';

import { OutgoingVerification } from 'server/discord-rbx/user/OutgoingVerification.ts'
import { RobloxUser } from 'server/discord-rbx/user/roblox/RBXUser.ts';
import { PendingVerificationMessage } from 'server/bot/messages/verification/pending.ts';
import { SuccessVerificationMessage } from 'server/bot/messages/verification/success.ts';

class Command extends BaseCommand {
    constructor() {
        super(new SlashCommandBuilder()
            .setName("test")
            .setDescription('Outputs the data to the console.')
        )
    };

    onCommandExecuted(interaction : CommandInteraction, member : DiscordUser, guild : DiscordGuild): void {
        const verification : OutgoingVerification = member.createOutgoingVerification();
        const verificationURL = verification.getURL();

        verification.verified().then(async function(user : RobloxUser) {
            const information = await user.getProfileInformation();
            interaction.editReply(SuccessVerificationMessage(information.name));
        }).catch(function() {
            
        });

        interaction.reply(PendingVerificationMessage(verificationURL));
    };
};

export default Command