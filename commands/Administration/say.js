const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "say",
    category: "Administration",
    aliases: [],
    cooldown: 2,
    usage: "say <TEXT>",
    description: "Resends your Text",
    run: async (client, message, args, user, text, prefix) => {
    try{
      if(!message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) return message.channel.send("I can't delete messages.");
      if(!args[0])
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.wrongicon)
            .setTitle(`❌ ERROR | You didn't provided a Text`)
            .setDescription(`Usage: \`${prefix}${this.usage}\``)
        );
      message.delete();
      message.channel.send(text);
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

