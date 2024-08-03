import { Client } from "discord.js";
import { BotEvent } from "../../types";
import { color } from "../../functions";

const event : BotEvent = {
    event: "ready",
    once: true,
    run: (client : Client) => {
        console.log(
            color("text", `💪 Logged in as ${color("variable", client.user?.tag)}`)
        )
    }
}

export default event;