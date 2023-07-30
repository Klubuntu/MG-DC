const {useQueue} = require("discord-player");
const {getEmoji, getEmbed, getSeconds} = require("../helpers/utils");
const {convert} = require("discord-emoji-convert")

async function queue(interaction){
   const config = interaction.locale_config
   const getQueue = useQueue(interaction.guild.id);
   if(getQueue){
      try{
         tracks = getQueue.tracks.toArray()
         tracks_raw = tracks[0].raw
         queueEmbedData = {
            color: 0x8a40de,
            title: `${getEmoji("music")} ${config.messages.queue[0].title}`
         }
         let queue_list = []
         num = 1
         for (const track of tracks){
            console.log(`${config.messages.queue[1].track} >`, track.raw.title, `: ${track.url}`)
            queue_list.push({ name: `${convert(num.toString())} ${config.messages.queue[1].track}: ${track.raw.title}`, value: track.url})
            num += 1
         }
         queueEmbedData.fields = queue_list
         listQueue = getEmbed(queueEmbedData)
         interaction.reply({embeds: [listQueue]}) 
       }
       catch(e){
         console.error("[DEBUG] Empty Queue | or External Error")
         console.error(e)
         interaction.reply(`:x: ${config.messages.queue[1].track}`)
       }
   }
   else{
      interaction.reply(`:x: ${config.messages.queue[3].empty}`)
   }
}

async function seek(interaction, seconds=0){
   const getQueue = useQueue(interaction.guild.id);
   if(getQueue){
      seekEmbedData = {
         color: 0x8a40de,
         title: `${getEmoji("skip")} ${config.messages.stop[0].seeked}`
      }
      if(seconds <= 0){
         skip_time = interaction.options.getInteger("seconds") * 1000;
      }
      else{
         skip_time = seconds * 1000
      }
      const currentTrackDuration = getQueue.currentTrack.durationMS | 0;
      if (skip_time > currentTrackDuration - 1000) {
         seekEmbedData.title = `:x: ${config.messages.seek[1].longer_duration}`;
         seekEmbed = getEmbed(seekEmbedData)
         interaction.reply({embeds: [seekEmbed]})
      }
      else{
         seekEmbed = getEmbed(seekEmbedData)
         interaction.reply({embeds: [seekEmbed]})
         await getQueue.node.seek(skip_time)
      }
   }else{
      interaction.reply(`:cd: ${config.messages.seek[2].no_song}`)
   }
}

async function skip(interaction){
   const getQueue = useQueue(interaction.guild.id);
   if(getQueue){
      skipEmbedData = {
         color: 0xde703a,
         title: `${getEmoji("skip")} ${config.messages.skip[0].skipped}`
      }
      skipEmbed = getEmbed(skipEmbedData)
      interaction.reply({embeds: [skipEmbed]})
      await getQueue.node.skip()
   }else{
      interaction.reply(`:cd: ${config.messages.user_not_playing}`)
   }
}

async function stop(interaction){
   const getQueue = useQueue(interaction.guild.id);
   if(getQueue){
      stopEmbedData = {
         color: 0xd62424,
         title: `${getEmoji("stop")} ${config.messages.stop[0].stopped}`
      }
      stopEmbed = getEmbed(stopEmbedData)
      interaction.reply({embeds: [stopEmbed]})
      await getQueue.node.stop(true)
   }else{
      interaction.reply(`:cd: ${config.messages.user_not_playing}`)
   }
}

function runtime(interaction){
   if (interaction.commandName === "queue") {
      queue(interaction);
   }
   if (interaction.commandName === "seek") {
      seek(interaction);
   }
   if (interaction.commandName === "moveto") {
      skip_hours = interaction.options.getInteger("hours");
      skip_min = interaction.options.getInteger("minutes");
      skip_sec = interaction.options.getInteger("seconds");
      const skip_time = getSeconds(skip_hours, skip_min) + skip_sec
      seek(interaction, skip_time);
   }
   if (interaction.commandName === "skip") {
      skip(interaction);
   }
   if (interaction.commandName === "stop") {
      try{
         stop(interaction);
      }
      catch{
         interaction.reply("[DEBUG] Error stopping current song")
      }
   }
}

module.exports = runtime