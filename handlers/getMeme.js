const { default: axios } = require("axios");

const indianReddit = [
  "IndianDankMemes",
  "india",
  "indiangaming",
  "dankinindia",
  "indianpeoplefacebook",
  "cricketshitpost",
  "bakchodi",
  "indianpeoplequora",
];
const getMeme = async () => {
  console.log("fetching meme");
  try {
    const { data } = await axios.get(
      `https://meme-api.herokuapp.com/gimme/${
        indianReddit[parseInt(Math.random() * indianReddit.length)]
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
