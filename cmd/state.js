const {useQueue} = require("discord-player");
const { getEmoji, getEmbed } = require("../helpers/utils");

async function progress(interaction){
   const config = interaction.locale_config
   getQueue = useQueue(interaction.guild.id)
   if(getQueue){
      progress_queue = getQueue.node.createProgressBar()
      console.log("[DEBUG] Progress - Queue exists")
      opts_prog = {
         color: 0xeda915,
         title: `${getEmoji("setup")} ${config.messages.progress[0].wait}`,
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
      interaction.reply(`:cd: ${config.messages.user_not_playing}`)
   }
}


async function pause(interaction) {
   const config = interaction.locale_config
   getQueue = useQueue(interaction.guild.id)
   if(getQueue){
    console.log("[DEBUG] Pause - Queue exists")
    opts_pause = {
      color: 0xeda915,
      title: `${getEmoji("pause")} ${config.messages.pause[0].paused}`
    }
    pause = getEmbed(opts_pause)
    interaction.reply({embeds: [pause]})
    await getQueue.node.pause()
   }else{
      interaction.reply(`:cd: ${config.messages.user_not_playing}`)
   }
}

async function resume(interaction) {
   const config = interaction.locale_config
   getQueue = useQueue(interaction.guild.id)
   if(getQueue){
    console.log("[DEBUG] Resume - Queue exists")
    opts_resume = {
      color: 0x4d8ceb,
      title: `${getEmoji("play")} ${config.messages.resume[0].resumed}`
    }
    resume = getEmbed(opts_resume)
    interaction.reply({embeds: [resume]})
    await getQueue.node.resume()
   }else{
      interaction.reply(`:cd: ${config.messages.resume[1].not_have_song}`)
   }
}

async function volume(interaction){
   const config = interaction.locale_config
   getQueue = useQueue(interaction.guild.id)
   if(getQueue){
      volumeLevel = interaction.options.getInteger("level")
      if(!volumeLevel){
         interaction.reply(`:speaker: ${config.messages.volume[0].level}: ${getQueue.node.volume}`)
      }
      else if(volumeLevel <= 200){
         await getQueue.node.setVolume(volumeLevel)
         interaction.reply(`:speaker: ${config.messages.volume[1].set} ${volumeLevel}`)
      }
      else{
         interaction.reply(`:x: ${config.messages.volume[2].max_level}`)
      }
   }
   else{
      interaction.reply(`:x: ${config.messages.user_not_playing}`)
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