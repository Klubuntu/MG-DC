const {useQueue } = require("discord-player");
const { getEmoji, getEmbed } = require("../helpers/utils");

async function progress(interaction){
   const config = interaction.locale_config
   getQueue = useQueue(interaction.guild.id)
   if(getQueue){
      progress_queue = getQueue.node.createProgressBar()
      progressEmbedData = {
         color: 0xeda915,
         title: `${getEmoji("setup")} ${config.messages.progress[0].wait}`,
         url: "https://youtube.com",
         desc: progress_queue
       }
      try{
         progressEmbedData.title = getQueue.history.currentTrack.title
         progressEmbedData.url = getQueue.history.currentTrack.url
         prog = getEmbed(progressEmbedData)
         interaction.reply({embeds: [prog]})
      }
      catch{
         prog = getEmbed(progressEmbedData)
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
      interaction.track = getQueue.currentTrack
      interaction.pauseEvent(interaction)
      await getQueue.node.pause()
   }else{
      interaction.reply(`:cd: ${config.messages.user_not_playing}`)
   }
}

async function resume(interaction) {
   const config = interaction.locale_config
   getQueue = useQueue(interaction.guild.id)
   if(getQueue){
      interaction.track = getQueue.currentTrack
      interaction.resumeEvent(interaction)
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
      interaction.reply(`:cd: ${config.messages.user_not_playing}`)
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