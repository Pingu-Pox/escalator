import fs from "fs";
import { Client, GatewayIntentBits } from "discord.js";
import {} from "dotenv/config";

// Create a new Client with the Guilds intent
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
    ],
});

// Fetch all js files in ./events
const events = fs
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));

// Check for an event and execute the corresponding file in ./events
for (let event of events) {
    // The #events ES6 import-abbreviation is defined in the package.json
    // Note that the entries in the list of files (created by readdirSync) end with .js,
    // so the abbreviation is different to the #commands abbreviation
    const eventFile = await import(`#events/${event}`);
    // But first check if it's an event emitted once
    if (eventFile.once)
        client.once(eventFile.name, (...args) => {
            eventFile.invoke(...args);
        });
    else
        client.on(eventFile.name, (...args) => {
            eventFile.invoke(...args);
        });
}

const requiredVariables = [
    "TOKEN",
    "IRONGUARD",
    "RAMHEART",
    "RUNEFORGE",
    "MATRIARCH",
    "IRONGUARD_COMMERCIAL",
    "IRONGUARD_LOGISTICAL",
    "IRONGUARD_MARTIAL",
    "RAMHEART_COMMERCIAL",
    "RAMHEART_LOGISTICAL",
    "RAMHEART_MARTIAL",
    "RUNEFORGE_COMMERCIAL",
    "RUNEFORGE_LOGISTICAL",
    "RUNEFORGE_MARTIAL",
];

const missingVariables = requiredVariables.filter(
    (variable) => !process.env[variable]
);

if (missingVariables.length > 0) {
    console.error(
        `Missing environment variables: ${missingVariables.join(", ")}`
    );
    process.exit(1);
}

console.log(
    "All required environment variables are present. Starting the bot..."
);
client.login(process.env.TOKEN);
