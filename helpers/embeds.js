const {getEmoji, getEmbed} = require("./utils");
const setUserLanguage = require('./lang_parser')
function useEmbed(track, name) {
   console.log(track.player.client)
   const config = setUserLanguage.embeds("en");
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
   if(name == "error"){
      embedName = eval("playEmbedData")
      embedName.img = null;
      embedName.fields= null;
      embedName.desc = `:x: ${config.messages.play[6].unsupported}`

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
   console.log(tmpNewEmbed.data.fields)
   return tmpNewEmbed
}

module.exports = {useEmbed: useEmbed}

