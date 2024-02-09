import { SlashCommandBuilder } from "discord.js";

export default class BaseCommand {
    command: SlashCommandBuilder;
    
    constructor(command : SlashCommandBuilder) {
        this.command = command;
    };
};