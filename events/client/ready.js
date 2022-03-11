const config = require("../../botconfig/config.json")
module.exports = client => {
  try{
    client.guilds.cache.forEach(guild => {
      console.log(`${guild.name} | ${guild.id}`);
    })
  }catch{ /* */ }
  let count = 0;
  client.guilds.cache.forEach((guild) => {
    count += guild.memberCount // <---

})
    setInterval(async function(){
    const fetch = require("node-superfetch");
    let user = ["moebeams", "ryval_alex"]
    for (var i = 0; i < 2; i++) {
      const uptime = await fetch.get(`http://decapi.me/twitch/uptime/${user[i]}`)
      const title = await fetch.get(`http://decapi.me/twitch/title/${user[i]}`)
  
      const twitch = require("../../models/twitch-schema")
      let data = await twitch.findOne({ user: user[i] }, { titletwitch: title.body })
      if(`${uptime.body}` === `${user[i]} is offline`) {
        await twitch.findOneAndDelete({ user: user[i] })
      } else {
        if (!data)  {
          data = new twitch({
            user: user[i],
            titletwitch: `${title.body}`
          })

          await client.channels.cache.get("837027849931194432").send({ content: `<@&951964510867046410>\n${user[i]} est en LIVE BANGER!\nhttps://www.twitch.tv/${user[i]}`})

          data.save()
        }
      }
    }
  }, 300000)
  try{
    client.user.setActivity(`${count} users`, { type: "WATCHING" });
  }catch (e) {
      console.log(String(e.stack));
  }
  //Change status each 10 minutes
  let nombre = 0;
  setInterval(()=>{
    nombre = nombre + 1;
    if (nombre === 3) {
      nombre = 1;
    }
    if (nombre === 1) {
      client.user.setActivity(`${client.guilds.cache.size} servers`, { type : "WATCHING"});
    }
    if (nombre === 2){
      client.user.setActivity(`${count} users`, { type : "WATCHING"})
    }
  }, 600000)
}

