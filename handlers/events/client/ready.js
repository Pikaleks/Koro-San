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
    client.user.setActivity(`Koro-San >~<`, { type: "WATCHING" });
  }catch (e) {
      console.log(String(e.stack));
  }
  //Change status each 10 minutes
}

