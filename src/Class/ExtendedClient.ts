import { Client, Collection, Partials } from "discord.js";
import { SlashCommand } from "../types";
import { readdirSync } from "fs";
import { join } from "path";

class ExtendedClient extends Client {
  collection = {
    slashCommands: new Collection<string, SlashCommand>(),
    cooldowns: new Collection<string, number>(),
    applicationcommandsArray: new Array<SlashCommand>(),
    components: {
      buttons: new Collection<string, SlashCommand>(),
      selects: new Collection<string, SlashCommand>(),
      modals: new Collection<string, SlashCommand>(),
      autocomplete: new Collection<string, SlashCommand>(),
      contextmenu: new Collection<string, SlashCommand>(),
    },
  };

  constructor() {
    super({
      intents: 38577,
      partials: [
        Partials.Message,
        Partials.Channel,
        Partials.User,
        Partials.ThreadMember,
      ],
      presence: {
        status: "online",
        activities: [
          {
            name: `the stars shine - BETA:0.7.1`,
            type: 3,
            url: "https://twitch.tv/postlemons",
          },
        ],
      },
    });
  }
  start = async () => {
    const handlersDir = join(__dirname, "../handlers");
    readdirSync(handlersDir).forEach((handler) => {
      if (!handler.endsWith(".js")) return;
      require(`${handlersDir}/${handler}`)(this);
    });
    await this.login(process.env.CLIENT_TOKEN);
  };
}

export { ExtendedClient };
