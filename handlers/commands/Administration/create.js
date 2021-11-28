const schema = require('../../models/custom-commands');
const { MessageEmbed } = require('discord.js');
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "create",
    category: "Administration",
    cooldown: 2,
    usage: "create <command name> <response>",
    description: "Allows you to create a custom command.",
    run: async (client, message, args, user, text, prefix) => {
    try{
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions.');

        const name = args[0]; const response = args.slice(1).join(" ");

        if(!name) return message.channel.send('Please specify a command name.');
        if(!response) return message.channel.send('Please specify a response.');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(data) return message.channel.send('This custom commands exists already!');
        const newData =  new schema({
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        message.channel.send(`Saved **${name}** as a custom command!`);
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