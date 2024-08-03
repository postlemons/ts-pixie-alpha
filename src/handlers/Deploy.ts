import { REST, Routes }from "discord.js"
import { log, isSnowflake } from "../functions"
import { config } from "../config";
import { ExtendedClient } from "../Class/ExtendedClient";

/**
 *
 * @param {ExtendedClient} client
 */
module.exports = async (client: ExtendedClient) => {
    const rest = new REST({ version: "10" }).setToken(
        process.env.CLIENT_TOKEN || config.client.token
    );

    try {
        log("Started loading application commands... (this might take minutes!)", "info");

        const guildId = process.env.GUILD_ID || config.development.guild;

        if (config.development && config.development.enabled && guildId) {
            if (!isSnowflake(guildId)) {
                log("Guild ID is missing. Please set it in .env or config file or disable development in the config", "err");
                return;
            };

            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID || config.client.id, guildId), {
                    body: client.collection.applicationcommandsArray,
                }
            );
                
            log(`📨 Successfully loaded application commands to guild id ${guildId}.`, "done");
        } else {
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID || config.client.id), {
                    body: client.collection.applicationcommandsArray,
                }
            );

            log("Successfully loaded application commands globally to Discord API.", "done");
        }
    } catch (e) {
        log(`Unable to load application commands to Discord API: ${e.message}`, "err");
        throw new Error(e);
    }
};
