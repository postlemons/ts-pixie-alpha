import { ExtendedClient } from "../Class/ExtendedClient";
import { readdirSync } from "fs";
import { log } from "../functions";
import { join } from "path";

module.exports = (client: ExtendedClient) => {
  const paths: string = join(__dirname, "../commands/")
  for (const type of readdirSync(paths)) {
    for (const dir of readdirSync(paths + type)) {
      for (const file of readdirSync(paths + type + "/" + dir).filter(
        (f) => f.endsWith(".js")
      )) {
        const module = require(paths + type + "/" + dir + "/" + file).default;
        
        if (!module) continue;

        if (!module.structure?.name || !module.run) {
          log(
            "Unable to load the command " +
              file +
              " due to missing 'structure#name' or/and 'run' properties.",
            "warn"
          );

          continue;
        }
        if (module.options?.DMs === true) {
          module.structure.integration_types = [0, 1];
          module.structure.contexts = [0, 1, 2];
        } else if (
          module.options?.DMs === false ||
          module.options?.DMs === undefined
        ) {
          module.structure.integration_types = [0];
          module.structure.contexts = [0];
        }
        client.collection.slashCommands.set(module.structure.name, module);
        client.collection.applicationcommandsArray.push(module.structure);

        log("✅ Loaded new command: " + file, "info");
      }
    }
  }
};
