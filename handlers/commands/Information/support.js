const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "support",
    category: "Information",
    cooldown: 2,
    usage: "support",
    description: "Gives you the support server link.",
    run: async (client, message, args, user, text, prefix) => {
    try{
      message.author.send(`Orayo !\nYou can join the support server here :3\nhttps://discord.gg/w9qmfNVKbP`)
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