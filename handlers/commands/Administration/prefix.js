const { MessageEmbed } = require("discord.js");
const prefixSchema = require('../../models/prefix');
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "prefix",
    category: "Administration",
    cooldown: 2,
    usage: "prefix <NEW_PREFIX>",
    description: "Change the bot prefix for your server.",
    run: async (client, message, args, user, text, prefix) => {
    try{
      const res = await args.join(" ")
      if(!message.channel.permissionsFor(message.author).has("ADMINISTRATOR")) return message.channel.send("You don't have enough permissions to use this command.");
            if(!res) return message.channel.send("Please provide a prefix.")
            prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
                if(err) throw err;
                if(data) {
                    await prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                    data = new prefixSchema({
                        Guild : message.guild.id,
                        Prefix : res
                    })
                    data.save()
                    message.channel.send(`Prefix changed to **${res}**.`)
                } else {
                    data = new prefixSchema({
                        Guild : message.guild.id,
                        Prefix : res
                    })
                    data.save()
                    message.channel.send(`Prefix changed to **${res}**.`)
                }
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

