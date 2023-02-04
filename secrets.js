import * as dotenv from "dotenv";
dotenv.config();

const environment = {
  open_ai_secret: process.env.OPENAI_API_KEY || "",
  discord_secret: process.env.DISCORD_SECRET || "",
  bot_channel_id: process.env.BOT_CHANNEL_ID || "",
  bot_name: process.env.BOT_NAME || "Potato Bot",
};

export default environment;
