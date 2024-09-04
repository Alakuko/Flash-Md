const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUtWN1pseUlLdEg5Q3N1RHU4K3YzWkFlTDBaMXhvWGo4OG1IWnpZOHBIWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ2VUYjYxQk9KK3lHOFVlYkhWYjJRWW5Na2paMno2KzlDVnp0cWdMb1pSUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFSWRERGpySUppaksvWEJaNUNuc3c1aVMxek9zcVdLcVJETWxJTVVYVGtVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3YVNEek9sUjg0bkczenpoWVNQTUgvanpISno3VTNQR0dtVnFvVVNTRVI0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitLMzNTRDkxUXRiT0RsWHBYRTJPcWI2cjhNM0kvOHUvTzNoenlsZzFWVlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZYSEdiUlVyRnk4SDJZdk5xeTRmK1VKdnJkVlRFQkFCNU5LOXdUb0laSGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUVhL2o3SGFKeXRjN25WNUZBV2lsU29peWVDY2dacjRQZDNHOWozcWlYND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS24zWVpOY0ZpVldqaExmbXVDeWxWVklUTElNL1JLdXhoZ3Y1OWRWTmJpcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNIVi9zWW9QQ1hJRjV2TGVCN2ZWRG9ZK0dhZmZ1R3dTYXlxZy9teElUM25pTWlUQ1BVaG9LcXFvT2VRaEVGVWVtR2dmcXVkVVF2OXdhZkI0YWVIWmpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEyLCJhZHZTZWNyZXRLZXkiOiJIYUxkUXYrSUUzVEhWMm12eU5jM1BWRVNxSStxNWVieG1lU3V2cWxtUEtrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ0b2w1cGxGclJHNjR4SlhXMDg3Nl9BIiwicGhvbmVJZCI6IjMwZTI3NTQ0LTQ5OTktNDA4Yy05YTFiLWRhNTgzYzEzNTdiOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5Zk91SUtyRVNIb1hYY0Q3YW1CQVcrVUozMW89In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im16Rlo5SkZPdE1oOHFiM09PYTlLblBmV0hRQT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pXdS9JTUZFSjZpNExZR0dDY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkJvUkNwSHIySlN1OU9IaTJ1dHc1Mld0czN6ViszaHB4WElvYkllMXpNUmM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjFPdWZnbmVFaFU5MDlmTjZXd29xbGJYMlBiQ0xrcC9nenFQRUkwZG9ha3V1TmhWS1VkeklNTHhlSlZ6dHg0NnluTUxmWldtZGVPTURGMkZHNWxMTUJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ2bXJkTXNPeFViTnRSejhBcFlpa1h4ZFpYOEtxZ1Y3clhub2txSmpoREJ1K1greHNBQmpWS3ZtVURvazN5WFhaMnJzQUFzL0dROFdBdjgzMjQzaVVpUT09In0sIm1lIjp7ImlkIjoiMjM0ODEzODM5Mjc3MDo1OEBzLndoYXRzYXBwLm5ldCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTM4MzkyNzcwOjU4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFhRVFxUjY5aVVydlRoNHRycmNPZGxyYk44MWZ0NGFjVnlLR3lIdGN6RVgifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNTQzNjE5NCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMQjMifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2348138392770", 
    A_REACT : process.env.AUTO_REACTION || 'off',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || 'recording',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

