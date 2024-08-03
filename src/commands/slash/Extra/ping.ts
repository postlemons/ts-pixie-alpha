import { ExtendedClient } from "../../../Class/ExtendedClient";
import { SlashCommand } from "../../../types";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { response } from "../../../functions";
  
  const Ping: SlashCommand = {
    structure: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Replies with the bot latency!"),
    options: {
      cooldown: 5000,
      DMs: true,
    },
    run: async (client: ExtendedClient, interaction: ChatInputCommandInteraction) => {
      let totalGuilds = client.guilds.cache.size;
  
      await interaction.reply({
        embeds: [
          response()
            .setImage("https://media1.tenor.com/m/AQhbT6etSCUAAAAC/anime-girl-anime.gif")
        ],
      });
      setTimeout(async () => {
        interaction.editReply({
          content: "",
          embeds: [
            response()
              .setDescription(
                `My ping is \`${client.ws.ping}ms\`\nResponse delay: \`${((await interaction.fetchReply()).createdTimestamp - interaction.createdTimestamp) / 1000
                }s\`\nShard Number: \`${Number(client?.shard?.ids) + 1
                  ? Number(client?.shard?.ids) + 1
                  : "1"
                }\`\nBoot Time: <t:${Math.floor(
                  Number(Date.now() - (client.uptime ?? 0)) / 1000
                )}:R>\nMemory Usage: \`${(
                  process.memoryUsage().heapUsed /
                  1024 /
                  1024
                ).toFixed(2)} MB\`\nTotal Servers: \`${totalGuilds || 0
                }\``
              )
              .setThumbnail(
                [
                  "https://cdn.discordapp.com/emojis/1219937235571572826.gif?v=1&size=64&quality=lossless",
                  "https://cdn.discordapp.com/emojis/1036892611492974623.gif?v=1&size=64&quality=lossless",
                  "https://cdn.discordapp.com/emojis/1216781251407773787.gif?v=1&size=64&quality=lossless",
                  "https://cdn.discordapp.com/emojis/1036245244846538792.gif?v=1&size=64&quality=lossless",
                ][Math.floor(Math.random() * 4)]
              ),
          ],
        });
      }, 2500);
    },
  };
  
export default Ping