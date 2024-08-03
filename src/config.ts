export const config = {
    client: {
        token: process.env.TOKEN,
        id: process.env.CLIENT_ID,
    },
    handler: {
        prefix: "?",
        deploy: true,
        commands: {
            slash: true,
            user: false,
            message: false,
        },
        mongodb: {
            enabled: true,
            uri: process.env.MONGODB_URI,
        },
    },
    users: {
        developers: [process.env.DEV],
    },
    development: {
        enabled: Number(process.env.beta) ?? false,
        guild: process.env.GUILD,
    },
    messageSettings: {
        embedColor: 0xffa4de,
        nsfwMessage: "<:MadokaLewd:1216274833550086224> This is NSFW channel command.",
        developerMessage: "<:ohmy:1216274822221529110> Sorry, only devs can mess up with this command.",
        cooldownMessage: "<:Ryukosip:1216274817213272064> Chotto a minute, This command has a cooldown of {cooldown}s.",
        globalCooldownMessage: "<:Ryukosip:1216274817213272064> Chotto a minute, This command has a global cooldown of {cooldown}s.",
        notHasPermissionMessage: "<:ohmy:1216274822221529110> You do not have the permission to use this command.",
        notHasPermissionComponent: "<:ohmy:1216274822221529110> My bad, but this interaction isn't yours.",
        missingDevIDsMessage: "The dev forgot to setup their own ID... smart!"
    },
    emojis: {
        Spin: "<a:Spin:1216274841884426333>",
        Munch: "<a:Munch:1216274819784376381>",
        Think: "<:awoothink:1216274876374057061>",
        Shino: "<:hhhhhhhhhhh:1216047730472914944>",
        Ohmy: "<:ohmy:1216274822221529110>",
        Smug: "<:NepSmug:1216274825346154586>",
        Salute: "<:Salute:1247168105772224523>"

    }
};
