import * as dotenv from "dotenv";
dotenv.config();

const environment = {
  open_ai_secret:
    process.env.OPENAI_API_KEY ||
    "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",
  discord_secret: process.env.DISCORD_SECRET || "",
  // channel ID's that bot is allowed to respond to
  bot_channel_ids: [process.env.BOT_CHANNEL_ID || "", "975715018421178368"],
  bot_name: process.env.BOT_NAME || "Potato Bot",
};

export default environment;
