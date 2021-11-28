const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");

const welcomeSchema = require('../../models/welcome-schema')


const cache = new Map()

const loadData = async () => {
  const results = await welcomeSchema.find()

  for (const result of results) {
    cache.set(result._id, result.channelId)
  }
}
loadData()
module.exports = {
    name: "setWelcome",
    category: "Administration",
    aliases: ["setwelcome" ,"sw"],
    cooldown: 2,
    usage: "setWelcome",
    description: "Register the channel as a welcome channel.",
    run: async (client, message, args, user, text, prefix) => {
    try{
      const { guild, channel } = message

    await welcomeSchema.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelId: channel.id,
      },
      {
        upsert: true,
      }
    )

    cache.set(guild.id, channel.id)

    message.channel.send(`New welcome channel is now set as: ${channel}!`);
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

module.exports.getChannelId = (guildId) => {
  return cache.get(guildId)
}
