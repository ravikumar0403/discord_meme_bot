const { default: axios } = require("axios");

const replyWithMeme = async (category, msg) => {
  try {
    const { data } = await axios.get(
      `https://meme-api.herokuapp.com/gimme/${category}`
    );
    if (data.nsfw) {
      msg.reply("Err! NSFW content");
    } else {
      msg.reply(data.url);
    }
  } catch (error) {
    msg.reply("Err! I'm not feeling well right now");
  }
};

module.exports = {
  replyWithMeme,
};
