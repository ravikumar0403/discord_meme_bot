const { default: axios } = require("axios");

const subreddit = [
  "IndianDankMemes",
  "meme",
  "dankinindia",
  "bakchodi",
  "indianpeoplequora",
];
const getMeme = async () => {
  console.log("fetching meme");
  try {
    const { data } = await axios.get(
      `https://meme-api.herokuapp.com/gimme/${
        subreddit[parseInt(Math.random() * subreddit.length)]
      }`
    );
    if (data.nsfw) {
      return await getMeme();
    } else {
      return data.url;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMeme,
};
