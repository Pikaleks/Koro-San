const schema = require('../../models/custom-commands');
const { MessageEmbed } = require('discord.js');
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "delete",
    category: "Administration",
    cooldown: 2,
    usage: "delete <command name>",
    description: "Delete a custom command.",
    run: async (client, message, args, user, text, prefix) => {
    try{
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions.');

        const name = args[0];

        if(!name) return message.channel.send('Please specify a command name.');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(!data) return message.channel.send('That custom command does not exist!');
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
        message.channel.send(`Removed **${name}** from custom commands!`);
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