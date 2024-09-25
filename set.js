const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib01TZDNDTGF6OU8ybmtBZU01ck9UTmtkbkMwNzlhYUwvaS9kQjV0Q2RWST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUm5DMzVINmJnUVJJK2tZbzBZZjdsU3ZsM1RxTThFYlRWaUFNbHorU3ZYMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2SmJxQnlROElZYk9vd21VUkFZY25YUlRsK1Rqdm8vc1c3K1RVVEwrYkdNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNOFlSWjltUkZYZnBkZjdrMkxRNVlSZWlyRnJRMVYzdCtEazFVVW0xQnlNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldKWFJRMlRDOEEzVGNOYVY2WlpIaEhkSWF3ZmRnN0Fqai9tcEdJdUZKMWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhNY2VvalJsNEFtMm5EQksxR0NPT3lWNW9NamZaWk52UTZ4SDZNUHZKelk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUtmTi9vZlA3OXJ2QWNteFpSZk1wZUpCd2J6c0dFQ1p5OVpZV1FWQzFWWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFQckgzNkJoZy9MZjVLNm1wVlh6Z0gvb1FhUGNwOTZVNTJ5alluZ3JXaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlN5ZnRXVUg4Z0JjZUljd2p1RnduaHB3UTEwZm8wZ2xJdXZoK1REL09iOVVBZWJJVWh2aGd4aEk1V1l2bURjQjc5T21weWpEVDJJLzJWK2ZQUnRpb0N3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTMsImFkdlNlY3JldEtleSI6IlpaM3JoZEZkQzZNVUpSSlNVcXRMa1RreEpxUTBBM2tpSHUxQmVpemgydkk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTExNTk4MzQ2MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBRjhGRDFCODIyNDlFRjFEM0JEM0VERTE0MUY1RTNDNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI3MjU4NTYyfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJBN0RaVkRUM1NvaWpqdGlSTUNNQ0NBIiwicGhvbmVJZCI6IjE1Nzk4OTBkLWQ4YjUtNDI3ZC1iNmM0LTFhMTgxZDA0MmI1NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHdXBzVVFGOW1VUUQ3ZHN6d09rL3hkTGRScmc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM245WU8yN3FwOWE3VE5VdHpBUVFkTnZoZTJFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRRRUU0RjNCIiwibWUiOnsiaWQiOiIyMzQ5MTE1OTgzNDYwOjI2QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPYTI5b1FDRUsrL3o3Y0dHQkFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ1NzdGM3NQVVJaK3J6elpUSS85V2ZHakxYZGc0MXIxYWw4TzMzVGxtelJVPSIsImFjY291bnRTaWduYXR1cmUiOiJBZzFrZm9SVVdzemhDZTcza0ZFM29tZFNUcHp5OFZuT0JQbXhpNFF6WVZuNWZka2JjbmF0TnVDN3ZFY01XTER1NlJJbG5lNmJWSTNMSE1OT2RWZldBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVDZmQzQ5SmltVGd4S0FWQmRtOGVKZVVkR0dwK1krcXpndFM4Zi9ZQXNvMXZCQ1hRMmFmaXBDNGRhblhvVVh2T3pGZDJnd0QvUW5GcjJPL2R0eUVhQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTE1OTgzNDYwOjI2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJ1K3hkN0QxRVdmcTg4MlV5UC9WbnhveTEzWU9OYTlXcGZEdDkwNVpzMFYifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjcyNTg1NTcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTllVIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Joshua",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 2349115983460",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Josh-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
