const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "simjoin",
    category: "_Owner",
    aliases: ["sim"],
    cooldown: 2,
    usage: "simjoin",
    description: "Simulate",
    run: async (client, message, args, user, text, prefix) => {
    try{
      if(message.author.id !== config.owner) return message.channel.send("You are not the owner");
      client.emit('guildMemberAdd', message.member)
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

