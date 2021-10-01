const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "kick",
    category: "Moderation",
    aliases: [""],
    cooldown: 2,
    usage: "kick <member> [reason]",
    description: "Ban member from your server.",
    run: async (client, message, args, user, text, prefix) => {
    try{
        const member = message.mentions.users.first();

        if(!member) return message.channel.send("You need to give me member to kick.");
        if(!message.channel.permissionsFor(message.author).has("KICK_MEMBERS")) return message.channel.send("You don't have enough permissions to use this command.");
        if(!message.channel.permissionsFor(client.user).has("KICK_MEMBERS")) return message.channel.send("I don't have enough permissions to ban.");
        if(message.guild.member(member).roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You can't kick this member.");
        if(!message.guild.member(member).kickable) return message.reply("I can't kick this member...");
        let reason = args.slice(1).join(' ') || "no reason";
        message.guild.member(member).kick().then(() => {

        message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`**${message.guild.member(member).user.username}** kicked !`)
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