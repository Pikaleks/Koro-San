const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "invite",
    category: "Information",
    aliases: [],
    cooldown: 2,
    usage: "invite",
    description: "Gives you the invite link.",
    run: async (client, message, args, user, text, prefix) => {
    try{
      message.author.send(`Orayo !\nYou can add me with this link :3\nhttps://discord.com/oauth2/authorize?client_id=881335414957441055&permissions=1610083447&scope=bot`)
    } catch (e) {
        console.log(String(e.stack))
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.wrongicon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}