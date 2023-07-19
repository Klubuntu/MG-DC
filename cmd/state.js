const {GuildQueuePlayerNode, useQueue } = require("discord-player");
const { getEmoji, getEmbed } = require("../helpers/utils");

async function progress(interaction){
   queue = useQueue(interaction.guild.id)
   if(queue){
      t_queue = new GuildQueuePlayerNode(queue)
      progress_queue = t_queue.createProgressBar()
      console.log("[DEBUG] Progress - Queue exists")
      opts_prog = {
         color: 0xeda915,
         title: `${getEmoji("setup")} Waiting for player start`,
         url: "https://youtube.com",
         desc: progress_queue
       }
      try{
         opts_prog.title = queue.history.currentTrack.title
         opts_prog.url = queue.history.currentTrack.url
         prog = getEmbed(opts_prog)
         interaction.reply({embeds: [prog]})
      }
      catch{
         prog = getEmbed(opts_prog)
         interaction.reply({embeds: [prog]})
      }

   }else{
      interaction.reply(":cd: User not playing songs")
   }
}


async function pause(interaction) {
   queue = useQueue(interaction.guild.id)
   if(queue){
    console.log("[DEBUG] Pause - Queue exists")
    opts_pause = {
      color: 0xeda915,
      title: `${getEmoji("pause")} Playing / Queue paused`
    }
    pause = getEmbed(opts_pause)
    interaction.reply({embeds: [pause]})
    t_queue = new GuildQueuePlayerNode(queue)
    await t_queue.pause()
   }else{
      interaction.reply(":cd: User not playing song")
   }
}

async function resume(interaction) {
   queue = useQueue(interaction.guild.id)
   if(queue){
    console.log("[DEBUG] Resume - Queue exists")
    opts_resume = {
      color: 0x4d8ceb,
      title: `${getEmoji("play")} Playing / Queue resumed`
    }
    resume = getEmbed(opts_resume)
    interaction.reply({embeds: [resume]})
    t_queue = new GuildQueuePlayerNode(queue)
    await t_queue.resume()
   }else{
      interaction.reply(":cd: User not playing song")
   }
}

function runtime(interaction){
   if (interaction.commandName === "progress") {
      progress(interaction);
   }
   if (interaction.commandName === "pause") {
      pause(interaction);
   }
   if (interaction.commandName === "resume") {
      resume(interaction);
   }
   
}

module.exports = runtime