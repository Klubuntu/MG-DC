const {getEmoji, getEmbed} = require("./utils");
function useEmbed(track, name) {
   const config = track.config
   trackSource = track.raw.source || track.__metadata.source
   trackSourceFormatted = trackSource.charAt(0).toUpperCase() + trackSource.slice(1)
   playEmbedData = {
      color: 0x26d9a0,
      title: `${getEmoji("music")} ${config.messages.play[1].playing} ${track.title}`,
      url: track.url,
      desc: "by Manager :cd: https://manager-discord.netlify.app",
      img: track.thumbnail,
      fields: [
        {name: config.messages.play[2].playing_from, value: ":headphones: "+ trackSourceFormatted, inline: true},
        // { name: "Channel", value: `<#${voiceChannel}>`, inline: true },
        { name: config.messages.play[3].duration, value: track.duration, inline: true },
        { name: config.messages.play[4].publish_date, value: track.__metadata.uploadedAt || config.messages.play[5].unknown, inline: true },
      ],
   };
   skipEmbedData = {
      color: 0xde703a,
      title: `${getEmoji("skip")} ${config.messages.skip[0].skipped}`
   }
   pauseEmbedData = {
      color: 0xeda915,
      title: `${getEmoji("pause")} ${config.messages.pause[0].paused}`
   }
   resumeEmbedData = {
      color: 0x4d8ceb,
      title: `${getEmoji("play")} ${config.messages.resume[0].resumed}`
   }
   seekEmbedData = {
      color: 0x8a40de,
      title: `${getEmoji("skip")} ${config.messages.seek[0].seeked}`
   }
   stopEmbedData = {
      color: 0xd62424,
      title: `${getEmoji("stop")} ${config.messages.stop[0].stopped}`
   }
   if(name == "error"){
      embedName = eval("playEmbedData")
      embedName.img = null;
      embedName.fields= null;
      embedName.desc = `:x: ${config.messages.play[6].unsupported}`

   }
   else if(name == "seek"){
      embedName = eval("seekEmbedData")
      if (track.other.skip_time > track.other.currentTrackDuration - 1000) {
         embedName.title = `:x: ${config.messages.seek[1].longer_duration}`;
      }
   }
   else if(name == "add"){
      embedName = eval("playEmbedData")
      embedName.title = `${getEmoji("clock")} ${config.messages.queue[2].added} ${track.title}`
   }
   else{
      embedName = eval(name + "EmbedData")
   }
   if(track.source != "youtube"){
      embedName.img = ""
      embedName.thumb = track.thumbnail
   }
   tmpNewEmbed = getEmbed(embedName)
   return tmpNewEmbed
}

module.exports = {useEmbed: useEmbed}

