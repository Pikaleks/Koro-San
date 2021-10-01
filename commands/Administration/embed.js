const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "embed",
    category: "Administration",
    aliases: ["say-embed"],
    cooldown: 2,
    usage: "embed <TITLE> ++ <DESCRIPTION>",
    description: "Resends a message from you as an Embed",
    run: async (client, message, args, user, text, prefix) => {
    try{
      if(!message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) return message.channel.send("I can't delete messages.");
      if(!args[0])
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.wrongicon)
            .setTitle(`❌ ERROR | You didn't provided a Title, nor a Description`)
            .setDescription(`Usage: \`${prefix}${this.usage}\``)
        );
      let userargs = args.join(" ").split("++");
      let title = userargs[0];
      let desc = userargs.slice(1).join(" ")
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(title ? title : "")
        .setDescription(desc ? desc : "")
      )
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
