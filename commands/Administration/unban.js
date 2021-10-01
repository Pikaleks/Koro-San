const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "unban",
    category: "Administration",
    aliases: [],
    cooldown: 2,
    usage: "unban <member> [reason]",
    description: "unban member from server",
    run: async (client, message, args, user, text, prefix) => {
    try{
        const bans = await message.guild.fetchBans();
        let userID = args[0]
        if(!userID) return message.channel.send("Please provide an ID.")
        let bannedMember = await client.users.fetch(userID);
        if(!bannedMember) return message.channel.send("I can't find the user...");
        if(!message.channel.permissionsFor(message.author).has("BAN_MEMBERS")) return message.channel.send("You don't have enough permissions to use this command.");
        if(!message.channel.permissionsFor(client.user).has("BAN_MEMBERS")) return message.channel.send("I don't have enough permissions to unban.");

        let reason = args.slice(1).join(' ') || "no reason";
        if (bans.has(bannedMember.id)) {
        message.guild.members.unban(bannedMember, reason).then(() => {

        message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`**${bannedMember.username}** unbanned !`)
            .setDescription(`Reason : **${reason}**`)
        )
        })
        } else {
            message.channel.send(`This user isn't banned.`)
        }
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