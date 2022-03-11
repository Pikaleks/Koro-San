const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "bugreport",
    category: "Utilities",
    aliases: ["bug"],
    cooldown: 2,
    usage: "bugreport <CMD_NAME> [BUG]",
    description: "Report a bug.",
    run: async (client, message, args, user, text, prefix) => {
    try{
        let name = args[0];

        if(!name) {
            return message.channel.send("Please enter the name of a command.")
        }

        let reason = args.slice(1).join(' ') || "no reason";
        
        client.channels.cache.get(config.bugchannelid).send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`Bug reported by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setDescription(`Commande name : ${name}\nBug : ${reason}`)
        );

      message.channel.send("The bug has been reported !\nThanks you !");

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
