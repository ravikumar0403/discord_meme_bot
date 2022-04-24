const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello!"));

app.listen(PORT, () => console.log(`server running on ${PORT}`));

require("dotenv").config();
const { Client, Intents } = require("discord.js");
const { getMeme } = require("./handlers/getMeme");
const { replyWithMeme } = require("./handlers/replyMeme");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", async () => {
  setInterval(async () => {
    const meme = await getMeme();
    let channel = client.channels.cache.find((channel) =>
      channel.name.includes("meme")
    );
    if (channel) {
      channel.send(meme);
    } else {
      channel = client.channels.cache.find((channel) =>
        channel.name.includes("general")
      );
      channel.send(meme);
    }
  }, 1000 * 60 * 60);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  if (msg.content.startsWith(";")) {
    const command = msg.content.split(";")[1];
    switch (command) {
      case "meme":
        replyWithMeme("", msg);
        break;
      case "help":
        msg.reply("`meme`, `category`, `help`");
        break;
      default:
        replyWithMeme(command, msg);
    }
  }
});

client.login(process.env.BOT_CLIENT_SECRET);
