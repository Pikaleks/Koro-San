const { MessageEmbed } = require("discord.js");
const prefixSchema = require('../../models/prefix');
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "prefix-reset",
    category: "Administration",
    aliases: ["pr"],
    cooldown: 2,
    usage: "prefix-reset",
    description: "Reset the prefix in your server.",
    run: async (client, message, args, user, text, prefix) => {
    try{
      const res = await args.join(" ")
      if(!message.channel.permissionsFor(message.author).has("ADMINISTRATOR")) return message.channel.send("You don't have enough permissions to use this command.");
      message.channel.send("Do you really want to reset the prefix?").then(async (msg) => {
        const filter = (reaction, user) =>
        ["✅", "❌"].includes(reaction.emoji.name) && message.author.id === user.id;
        const collector = msg.createReactionCollector(filter, { time: 60000 });
        await msg.react("✅");
        await msg.react("❌");
        collector.on("collect", async (reaction, user) => {
            if (reaction.emoji.name === "✅") {
                msg.delete()
              await prefixSchema.findOneAndDelete({ Guild : message.guild.id })
              message.channel.send(`Prefix reset to **${prefix}** !`)
            }

            if (reaction.emoji.name === "❌") {
                msg.delete()
              message.channel.send("The prefix has not been reset.")
            }
        })
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

