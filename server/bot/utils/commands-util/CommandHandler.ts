import { REST, Routes, Events, Collection, Client } from 'discord.js';
import chalk from 'chalk';

import fs from 'node:fs';
import path from 'node:path';
import BaseCommand from './BaseCommand.ts';
import { RBXDiscord } from 'server/discord-rbx/discord-rbx.ts';
import { DiscordGuild } from 'server/discord-rbx/guild/DiscordGuild.ts';
import { DiscordUser } from 'server/discord-rbx/user/DiscordUser.ts';

const CLIENT_ID : string = "1114212570274988144"

const cmd_directory = './server/bot/commands'

class CommandHandler {
    commands = new Collection();
    command_registry : any = [];
    rest: REST | undefined;
    rbxdiscord: RBXDiscord;

    constructor(rbxdiscord : RBXDiscord) {
        this.rbxdiscord = rbxdiscord;
    }

    async listen(client : Client) {
        client.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isChatInputCommand()) return;
            if(!interaction.guild) return;
            
            const guild : DiscordGuild = this.rbxdiscord.getDiscordServer(interaction.guild?.id);
            const member : DiscordUser = guild.getDiscordMember(interaction.user.id) as DiscordUser;
            const command : any = this.commands.get(interaction.commandName);

            try {
                await command.onCommandExecuted(interaction, member, guild);
            } catch (error) {
                console.error(error);

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        });
    }
 
    async initalize(token: string) {
        this.rest = new REST({ version: '10' }).setToken(token);

        const commandFolders = fs.readdirSync(cmd_directory);

        for (const folder of commandFolders) {
            const commandsPath = path.join(cmd_directory, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

            for (const file of commandFiles) {
                let dir = '../../commands/' + folder + '/' + file;

                const module = await import(dir)
                const command : BaseCommand = new module.default();

                this.commands.set(command.command.name, command)
                this.command_registry.push(command.command.toJSON());
            };
        };

        try {
            console.log(chalk.green(`[COMMANDS] Started refreshing ${this.command_registry.length} application (/) commands.`));

            const data : any = await this.rest.put(
                Routes.applicationCommands(CLIENT_ID.toString()),
                { body: this.command_registry },
            );
            
            console.log(chalk.green(`[COMMANDS] Successfully reloaded ${data.length} application (/) commands.`));
        } catch (error) {
            console.error(error);
        }
    }
}

export { CommandHandler };