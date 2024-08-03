import { ExtendedClient } from "../Class/ExtendedClient";
import { readdirSync } from "fs";
import { log } from "../functions";
import { join } from "path";

module.exports = (client: ExtendedClient) => {
    const paths = join(__dirname, "../events/")
    for (const dir of readdirSync(paths)) {
        
        for (const file of readdirSync(paths + dir).filter((f) => f.endsWith('.js'))) {
            const module = require(paths + dir + '/' + file).default;

            if (!module) continue;

            if (!module.event || !module.run) {
                log('Unable to load the event ' + file + ' due to missing \'name\' or/and \'run\' properties.', 'warn');

                continue;
            };

            log('Loaded new event: ' + file, 'info');

            if (module.once) {
                client.once(module.event, (...args) => module.run(client, ...args));
            } else {
                client.on(module.event, (...args) => module.run(client, ...args));
            };
        };
    };
}
