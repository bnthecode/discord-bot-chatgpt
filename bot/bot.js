import { ActivityType, Client, GatewayIntentBits, Partials } from "discord.js";
import environment from "../secrets.js";
import openai, { baseDialogConfig } from "./open_ai/open_ai.js";

const { discord_secret, bot_name, bot_channel_ids } = environment;

class Bot {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      partials: [Partials.Channel, Partials.Message],
    });
  }

  registerCallbacks = async () => {
    try {
      this.client.login(discord_secret);
      this.client.on("ready", async () => await this.initalizeBot());
      this.client.on("guildMemberAdd", async (member) => {
        await this.newMemberWelcomeMessage(member);
      });
      this.client.on("messageCreate", async (message) => {
        await this.sendMessage(message);
      });
    } catch (error) {
      console.log(`Error registering callbacks: ${error}`);
    }
  };

  initalizeBot = async () => {
    try {
      console.log(`Initailizing ${bot_name}`);
      this.setStatus();
    } catch (error) {
      console.log(`Error initializing bot: ${error}`);
    }
  };

  setStatus = async () => {
    try {
      console.log(`Setting ${bot_name} Activity`);
      this.client.user.setPresence({
        activities: [
          { name: `to your thoughts`, type: ActivityType.Listening },
        ],
      });
    } catch (error) {
      console.log(`Error setting bot status: ${error}`);
    }
  };

  validateMessage = ({ author, channelId }) =>
    !author.bot && bot_channel_ids.includes(channelId);

  sendMessage = async (message) => {
    try {
      if (this.validateMessage(message)) {
        const response = await this.generateOpenAiDialog(message);
        message.reply(response);
      }
    } catch (error) {
      console.log(`Error sending message: ${error}`);
    }
  };

  generateOpenAiDialog = async (input) => {
    try {
      const completion = await openai.createCompletion({
        ...baseDialogConfig,
        prompt: input.content,
      });
      return completion.data.choices[0].text;
    } catch (error) {
      console.log(`Error generating openAI dialog: ${error}`);
    }
  };

  newMemberWelcomeMessage = async (member) => {
    try {
      member.guild.channels.get("channelID").send("Welcome to POTATO ROAD!");
    } catch (error) {
      console.log(`Error sending new member message: ${error}`);
    }
  };
}

export default Bot;
