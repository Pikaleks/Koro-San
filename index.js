//Importing all needed Commands
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const fs = require("fs"); //this package is for reading files and getting their inputs
const mongoose = require('mongoose');
const config = require('./botconfig/config.json')
const prefix = config.prefix
mongoose.connect(process.env.mongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(console.log('Connected to mongodb'))

//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const prefixSchema = require('./models/prefix')

client.prefix = async function(message) {
  let custom;

  const data = await prefixSchema.findOne({ Guild : message.guild.id })
      .catch(err => console.log(err))
  
  if(data) {
      custom = data.Prefix;
  } else {
      custom = prefix;
  }
  return custom;
}

client.on('guildDelete', async (guild) => {
  prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
          prefixSchema.findOneAndDelete({ Guild : guild.id }).then(console.log('deleted data.'))
      }
  })
})

const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
const path = require('path')
const { getChannelId } = require('./commands/Administration/setWelcome')
const WelcomeSchema = require('./models/welcome-schema');

const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;

	do {
		context.font = `${fontSize -= 10}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 300);

	return context.font;
};

client.on("guildMemberAdd", async member => {

  WelcomeSchema.findOne({ guildId: member.guild.id }, async (err, data) => {
    const { guild } = member

    const channelId = getChannelId(guild.id)
    if (!channelId) {
      return
    }
  
    const channel = guild.channels.cache.get(channelId)
    if (!channel) {
      return
    }

  //If not in a guild return
  if(!member.guild) return;
  //create a new Canvas
  const canvas = Canvas.createCanvas(1772, 633);
  //make it "2D"
  const ctx = canvas.getContext('2d');
  //set the Background to the welcome.png
  const background = await Canvas.loadImage(`./botconfig/welcome.png`);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#f2f2f2';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  //set the first text string 
  var textString3 = `${member.user.username}`;
  //if the text is too big then smaller the text
  if (textString3.length >= 14) {
    ctx.font = 'bold 100px sans-serif';
    ctx.fillStyle = '#f2f2f2';
    ctx.fillText(textString3, 725, canvas.height / 2 + 20);
  }
  //else dont do it
  else {
    ctx.font = 'bold 150px sans-serif';
    ctx.fillStyle = '#f2f2f2';
    ctx.fillText(textString3, 725, canvas.height / 2 + 20);
  }
  //define the Discriminator Tag
  var textString2 = `#${member.user.discriminator}`;
  ctx.font = 'bold 40px sans-serif';
  ctx.fillStyle = '#f2f2f2';
  ctx.fillText(textString2, 730, canvas.height / 2 + 58);
  //define the Member count
  var textString4 = `You are the ${member.guild.memberCount}th member!`;
  ctx.font = 'bold 60px sans-serif';
  ctx.fillStyle = '#f2f2f2';
  ctx.fillText(textString4, 750, canvas.height / 2 + 125);
  //get the Guild Name
  var textString4 = `${member.guild.name}`;
  ctx.font = 'bold 60px sans-serif';
  ctx.fillStyle = '#f2f2f2';
  ctx.fillText(textString4, 700, canvas.height / 2 - 150);
  //create a circular "mask"
  ctx.beginPath();
  ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
  ctx.closePath();
  ctx.clip();
  //define the user avatar
  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
  //draw the avatar
  ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
  //get it as a discord attachment
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
  //define the welcome embed
  /*const welcomeembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("Welcome", member.guild.iconURL({ dynamic: true }))
    .setDescription(`**Welcome to ${member.guild.name}!**
  Hi <@${member.id}>!, read and accept the rules!`)
    .setImage("attachment://welcome-image.png")
    .attachFiles(attachment);*/
  //send the welcome embed to there
  channel.send({ files: [attachment] });
  /*//member roles add on welcome every single role
  let roles = config.ROLES_WELCOME;
  for(let i = 0; i < roles.length; i++ )
  member.roles.add(roles[i]);*/
  })
})

//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

//Loading files, with the client variable like Command Handler, Event Handler, ...
["commands", "events"].forEach(handler => {
    require(`./${handler}`)(client);
});
//login into the bot
client.login(process.env.token);
