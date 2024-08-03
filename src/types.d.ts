import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js"
import mongoose from "mongoose"
import { ExtendedClient } from "./Class/ExtendedClient"

export interface SlashCommand {
    structure: SlashCommandBuilder,
    run: (client: ExtendedClient, interaction: any) => void,
    autocomplete?: (interaction: AutocompleteInteraction) => void,
    modal?: (interaction: ModalSubmitInteraction<CacheType>) => void,
    options?: {
        DMs?: boolean
        cooldown?: number // in seconds
        developers?: boolean
        nsfw?: boolean
        globalCooldown?: number
    }
}

export interface Command {
    name: string,
    run: (message: Message, args: Array<string>) => void,
    permissions: Array<PermissionResolvable>,
    aliases: Array<string>,
    cooldown?: number,
}

interface GuildOptions {
    prefix: string,
}

export interface IGuild extends mongoose.Document {
    guildID: string,
    options: GuildOptions
    joinedAt: Date
}

export type GuildOption = keyof GuildOptions
export interface BotEvent {
    event: string,
    once?: boolean | false,
    run: (...args?) => void
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string,
            CLIENT_ID: string,
            PREFIX: string,
            MONGO_URI: string,
            MONGO_DATABASE_NAME: string
        }
    }
}