//here the event starts
const config = require("../../botconfig/config.json")
module.exports = client => {
  try{
    client.guilds.cache.forEach(guild => {
      console.log(`${guild.name} | ${guild.id}`);
    })
  }catch{ /* */ }

  try{
    client.user.setActivity(`${client.guilds.cache.size} guilds`, { type: "WATCHING" });
  }catch (e) {
      console.log(String(e.stack));
  }
  //Change status each 10 minutes
  setInterval(()=>{
    try{
      client.user.setActivity(`${client.users.cache.size} users`, { type: "WATCHING" });
    }catch (e) {
        console.log(String(e.stack));
    }
  }, 10*60*1000)
}

