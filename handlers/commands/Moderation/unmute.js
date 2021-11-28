const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "unmute",
    category: "Moderation",
    cooldown: 2,
    usage: "unmute <member> [reason]",
    description: "Unmutes member in your server.",
    run: async (client, message, args, user, text, prefix) => {
    try{
        const member = message.mentions.users.first();
        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === "muted");

        if(!member) return message.channel.send("You need to give me people to mute.");
        if(!message.channel.permissionsFor(message.author).has("MANAGES_ROLES")) return message.channel.send("You don't have enough permissions to use this command.");
        if(!message.channel.permissionsFor(client.user).has("MANAGE_ROLES")) return message.channel.send("I don't have enough permissions to mute.");
        if(message.guild.member(member).roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You can't mute this member.");
        
        if(!message.guild.member(member).roles.cache.has(role.id)) return message.channel.send("This member isn't mute.");
        let reason = args.slice(1).join(' ') || "no reason";
        await message.guild.member(member).roles.remove(role).then(() => {

        message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`**${message.guild.member(member).user.username}** unmuted !`)
            .setDescription(`Reason : **${reason}**`)
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