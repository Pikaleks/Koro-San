//here the event starts
const config = require("../../botconfig/config.json")
module.exports = client => {
  try{
    console.log("Ready")
  }catch{ /* */ }

  try{
    client.user.setActivity(`${client.guilds.cache.size} users`, { type: "WATCHING" });
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

