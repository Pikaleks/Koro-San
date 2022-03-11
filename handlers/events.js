const fs = require("fs");
const allevents = [];
module.exports = async (client) => {
  try{
    const load_dir = (dir) => {
      const event_files = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith(".js"));
      for (const file of event_files){
        const event = require(`../events/${dir}/${file}`)
        let eventName = file.split(".")[0];
        allevents.push(eventName);
        client.on(eventName, event.bind(null, client));
      }
    }
    await ["client", "guild"].forEach(e=>load_dir(e));
    for (let i = 0; i < allevents.length; i++) {
        try {
          continue;
        } catch (e) {
            console.log(String(e.stack));
        }
    }
    try{
      console.log("HANDLER READY")
    }catch{ /* */ }
    try{
      console.log("BOT LOGIN...")
    }catch{ /* */ }
  }catch (e){
    console.log(String(e.stack))
  }
};

