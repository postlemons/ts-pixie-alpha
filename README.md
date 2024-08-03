## Installation

You must have a `.env` file with the following template info.

```env
CLIENT_TOKEN = ""
CLIENT_ID = ""
GUILD_ID = "" // for dev server to test slash cmds
MONGODB_URI = "" // make sure to include the database name at the end of it
DEV = "" // account ID to limit dev commands
WebhookID = "" // not added yet - for events
WebhookToken = "" // not added yet - for events
```

then run `npm run build` and `npm start`
### Platforms:
- **Node.js** v16.9.0 or newer

