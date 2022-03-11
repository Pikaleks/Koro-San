const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { wiki } = require("vTuber-wiki")
module.exports = {
    name: "vtuber",
    category: "Fun",
    aliases: ["hololive"],
    cooldown: 2,
    usage: "vtuber <name>",
    description: "Gives you information on vtuber",
    run: async (client, message, args, user, text, prefix) => {
    try{
        if(!args[0])
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.wrongicon)
            .setTitle(`❌ ERROR | You didn't provided a Text`)
            .setDescription(`Usage: \`${prefix}${this.usage}\``)
        );
        wiki(text).then(async(output)=>{
            if(output === null) return message.channel.send("I didn't find this vtuber.")

            console.log(output)
        })
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
