const {GuildQueuePlayerNode, useQueue} = require("discord-player");
const {getEmoji, getEmbed, getSeekTime} = require("../helpers/utils");
const {convert} = require("discord-emoji-convert")

async function queue(interaction){
   const queue = useQueue(interaction.guild.id);
   if(queue){
      try{
         tracks = queue.tracks.toArray()
         tracks_raw = tracks[0].raw
         opts_queue = {
            color: 0x8a40de,
            title: `${getEmoji("music")} Queue List / Next Songs`
         }
         let queue_list = []
         num = 1
         for (const track of tracks){
            console.log("Track >", track.raw.title, `: ${track.url}`)
            queue_list.push({ name: `${convert(num.toString())} Track: ${track.raw.title}`, value: track.url})
            num += 1
         }
         opts_queue.fields = queue_list
         listQueue = getEmbed(opts_queue)
         interaction.reply({embeds: [listQueue]}) 
       }
       catch{
         console.error("[DEBUG] Empty Queue")
         interaction.reply(":x: Queue Empty, no added next songs to play")
       }
   }
   else{
      interaction.reply(":x: Queue Empty, no added songs to play")
   }
}

async function seek(interaction){
   const queue = useQueue(interaction.guild.id);
   if(queue){
      console.log("[DEBUG] Seek - Queue exists")
      opts_seek = {
         color: 0x8a40de,
         title: `${getEmoji("skip")} Rewinded song`
      }
      seek = getEmbed(opts_seek)
      interaction.reply({embeds: [seek]})
      t_queue = new GuildQueuePlayerNode(queue)
      skip_sec = interaction.options.getInteger("seconds");
      await t_queue.seek(skip_sec)
   }else{
      interaction.reply(":cd: User not playing song")
   }
}

async function moveto(interaction){
   const queue = useQueue(interaction.guild.id);
   if(queue){
      console.log("[DEBUG] Seek - Queue exists")
      opts_moveto = {
         color: 0x8a40de,
         title: `${getEmoji("skip")} Rewinded song`
      }
      moveto = getEmbed(opts_moveto)
      interaction.reply({embeds: [moveto]})
      t_queue = new GuildQueuePlayerNode(queue)
      skip_hours = interaction.options.getInteger("hours");
      skip_min = interaction.options.getInteger("minutes");
      skip_sec = interaction.options.getInteger("seconds");
      console.log()
      skip_time = getSeekTime(skip_hours, skip_min) + skip_sec
      console.log("[DEBUG] Seeking to",skip_time, "sek")
      await t_queue.seek(skip_time)
   }else{
      interaction.reply(":cd: User not playing song")
   }
}

async function skip(interaction){
   const queue = useQueue(interaction.guild.id);
   if(queue){
      console.log("[DEBUG] Skip - Queue exists")
      opts_skip = {
         color: 0xde703a,
         title: `${getEmoji("skip")} Skipped Song`
      }
      skip = getEmbed(opts_skip)
      interaction.reply({embeds: [skip]})
      t_queue = new GuildQueuePlayerNode(queue)
      await t_queue.skip()
   }else{
      interaction.reply(":cd: User not playing songs")
   }
}

async function stop(interaction){
   const queue = useQueue(interaction.guild.id);
   if(queue){
      console.log("[DEBUG] Stop - Queue exists")
      opts_stop = {
         color: 0xd62424,
         title: `${getEmoji("stop")} Stopped playing queue`
      }
      stop = getEmbed(opts_stop)
      interaction.reply({embeds: [stop]})
      t_queue = new GuildQueuePlayerNode(queue)
      await t_queue.stop(true)
   }else{
      interaction.reply(":cd: User not playing song")
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
      moveto(interaction);
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