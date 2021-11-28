require('dotenv').config();
const axios = require('axios')
const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "korone",
    category: "Fun",
    cooldown: 2,
    usage: "korone",
    description: "Gives a random koorone gif.",
    run: async (client, message, args, user, text, prefix) => {
    try{
      const URL = encodeURI(`https://api.tenor.com/v1/random?q=inugami korone&key=${ee.token}&limit=1`)
      axios.get(URL).then(res => {
        // console.log(res.data);
        const embed = {
          color: 3117311,
          footer: {
            text: 'Copyright Tenor'
          },
          image: {
            url: res.data.results[0].media[0].gif.url
          }
        }
        message.channel.send({embed:embed})
      })
    } catch (e) {
        console.log(String(e.stack))
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.wrongicon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`If this message persists please bug report the command.`)
        );
    }
  }
}
