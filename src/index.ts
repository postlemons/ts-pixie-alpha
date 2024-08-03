import { ExtendedClient } from "./Class/ExtendedClient";
import { config } from "dotenv";
config()

const client = new ExtendedClient();
client.start();

