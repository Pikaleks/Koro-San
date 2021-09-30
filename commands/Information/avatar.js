const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "avatar",
    category: "Information",
    aliases: [],
    cooldown: 2,
    usage: "avatar <member>",
    description: "Fetches a member's avatar.",
    run: async (client, message, args, user, text, prefix) => {
    try{
        let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
        if (message.mentions.users.size > 0) {
            const embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`Avatar for ${message.mentions.users.first().username}:`)
            .setImage(`${avatar}`)
            message.channel.send({embed});
          } else {
            const embed = new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`Avatar for ${message.author.username}:`)
            .setImage(`${avatar + "?size=2048"}`)
            message.channel.send({embed});
          }
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.wrongicon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}