//here the event starts
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
    console.log(nombre)
  }, 600000)
}

