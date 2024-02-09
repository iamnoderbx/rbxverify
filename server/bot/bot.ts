import {LinkedHandler, LinkedStatus, DiscordLink} from "server/linked/LinkedHandler.ts"
import { Client, GatewayIntentBits } from 'discord.js';

import { CommandHandler } from "server/bot/utils/utils.ts"
import { RBXDiscord } from "server/discord-rbx/discord-rbx.ts"

const TOKEN = "MTExNDIxMjU3MDI3NDk4ODE0NA.GZbD8D.TWXQoB4jhnTcUumNmwBU9GmgqPBlgZ2QPiQ1YY"

export default class RBXVerifyBot {
  client: Client<boolean>;
  DynamicDiscordLink: DiscordLink;
  rbxdiscord: RBXDiscord | undefined;
  commandHandler: CommandHandler | undefined;
  
  constructor() {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });

    this.DynamicDiscordLink = new DiscordLink("DISCORD_LINK");
    LinkedHandler.createDynamicLink(this.DynamicDiscordLink);
  };

  initalize() {
    this.client.on('ready', () => {
      this.DynamicDiscordLink.status(LinkedStatus.Available);
    });

    this.rbxdiscord = new RBXDiscord(this.client);
    this.commandHandler = new CommandHandler(this.rbxdiscord);

    this.client.login(TOKEN).then(() => {
      if(!this.commandHandler) return;

      this.commandHandler.initalize(TOKEN);
      this.commandHandler.listen(this.client);
    });
  };
};