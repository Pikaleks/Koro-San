const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "ban",
    category: "Administration",
    aliases: [],
    cooldown: 2,
    usage: "ban <member> [reason]",
    description: "Ban member from server",
    run: async (client, message, args, user, text, prefix) => {
    try{
        const member = message.mentions.users.first();
        if(!member) return message.channel.send("You need to give me member to ban.");
        if(!message.channel.permissionsFor(message.author).has("BAN_MEMBERS")) return message.channel.send("You don't have enough permissions to use this command.");
        if(!message.channel.permissionsFor(client.user).has("BAN_MEMBERS")) return message.channel.send("I don't have enough permissions to ban.");
        if(message.guild.member(member).roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You can't ban this member.");
        if(!message.guild.member(member).bannable) return message.channel.send("I can't ban this member.");

        let reason = args.slice(1).join(' ') || "no reason";
        message.guild.member(member).ban().then(() => {

        message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`**${message.guild.member(member).user.username}** banned !`)
            .setDescription(`Reason : **${reason}**`)
        )
    })
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