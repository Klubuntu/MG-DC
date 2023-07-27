const {useQueue} = require("discord-player");
const { getEmoji, getEmbed } = require("../helpers/utils");

async function progress(interaction){
   getQueue = useQueue(interaction.guild.id)
   if(getQueue){
      progress_queue = getQueue.node.createProgressBar()
      console.log("[DEBUG] Progress - Queue exists")
      opts_prog = {
         color: 0xeda915,
         title: `${getEmoji("setup")} Waiting for player start`,
         url: "https://youtube.com",
         desc: progress_queue
       }
      try{
         opts_prog.title = getQueue.history.currentTrack.title
         opts_prog.url = getQueue.history.currentTrack.url
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
   getQueue = useQueue(interaction.guild.id)
   if(getQueue){
    console.log("[DEBUG] Pause - Queue exists")
    opts_pause = {
      color: 0xeda915,
      title: `${getEmoji("pause")} Playing / Queue paused`
    }
    pause = getEmbed(opts_pause)
    interaction.reply({embeds: [pause]})
    await getQueue.node.pause()
   }else{
      interaction.reply(":cd: User not playing song")
   }
}

async function resume(interaction) {
   getQueue = useQueue(interaction.guild.id)
   if(getQueue){
    console.log("[DEBUG] Resume - Queue exists")
    opts_resume = {
      color: 0x4d8ceb,
      title: `${getEmoji("play")} Playing / Queue resumed`
    }
    resume = getEmbed(opts_resume)
    interaction.reply({embeds: [resume]})
    await getQueue.node.resume()
   }else{
      interaction.reply(":cd: User not have song to play")
   }
}

async function volume(interaction){
   getQueue = useQueue(interaction.guild.id)
   if(getQueue){
      volumeLevel = interaction.options.getInteger("level")
      if(!volumeLevel){
         interaction.reply(":speaker: The current volume set is: " + getQueue.node.volume)
      }
      else if(volumeLevel <= 200){
         await getQueue.node.setVolume(volumeLevel)
         interaction.reply(":speaker: Changed volume to " + volumeLevel)
      }
      else{
         interaction.reply(":x: User set undefined volume level")
      }
   }
   else{
      interaction.reply(":x: User not playing song")
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
   if (interaction.commandName === "volume") {
      volume(interaction);
   }
}

module.exports = runtime