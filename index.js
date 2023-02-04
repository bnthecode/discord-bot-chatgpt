import express from "express";
import Bot from "./bot/bot.js";
const app = express();
const port = 8080;

const PotatoBot = new Bot();
await PotatoBot.registerCallbacks();

app.listen(port, () => {
  console.log(`Discord Bot server running on port ${port}`);
});
