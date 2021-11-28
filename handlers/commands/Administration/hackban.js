const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "hackban",
    category: "Administration",
    cooldown: 2,
    usage: "hackban <member_ID> [reason]",
    description: "Ban a member who is not on the server",
    run: async (client, message, args, user, text, prefix) => {
    try{
        if(!message.channel.permissionsFor(message.author).has("BAN_MEMBERS")) return message.channel.send("You don't have enough permissions to use this command.");
        if(!message.channel.permissionsFor(client.user).has("BAN_MEMBERS")) return message.channel.send("I don't have enough permissions to ban.");
        const member = args[0];
        const char = message.content
        console.log(char.length)
        if(char.length > 27) return message.channel.send("Please provide a valid ID");
        if(char.length < 27) return message.channel.send("Please provide a valid ID");
        if (!member) return message.channel.send('You need to input a User ID');
        if (args[0] === message.author.id) return message.channel.send('Why do you want to ban yourself ??');
        if (member === client.user.id) return message.channel.send("You really want to ban me... ?");
        let reason = args.slice(1).join(' ') || "no reason";
        let banList = await message.guild.fetchBans();
        try{
        let targetId = banList.get(member).user
        if (targetId) return message.channel.send(`That user has already been banned!`);
        } catch (e) {
      

        message.guild.members.ban(member, {days:7, reason: reason})

        let bannedMember = await client.users.fetch(member);
        message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`**${bannedMember.username}** banned !`)
            .setDescription(`Reason : **${reason}**`)
        )
        }
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