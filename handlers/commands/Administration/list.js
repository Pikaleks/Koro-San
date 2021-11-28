const schema = require('../../models/custom-commands');
const { MessageEmbed } = require('discord.js');
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "list",
    category: "Administration",
    cooldown: 2,
    usage: "list",
    description: "Give you the list of all custom command.",
    run: async (client, message, args, user, text, prefix) => {
    try{
        schema.findOne({ Guild : message.guild.id }, async(err, data) => {
        
            if(!data) return message.channel.send('There is no custom commands.');
            const data2  = await schema.find({ Guild: message.guild.id });
            message.channel.send(
                new MessageEmbed()
                    .setColor('BLUE')
                    .setTimestamp()
                    .setFooter(`Lumi ™`, client.user.avatarURL())
                    .setDescription(
                        data2.map((cmd, i) => 
                            `${i + 1}: ${cmd.Command}`
                        ).join('\n')
                    )
            )
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