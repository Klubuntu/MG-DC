const {getEmoji, getEmbed} = require("./utils");
const setUserLanguage = require('./lang_parser')
async function useEmbed(track, name) {
   const config = await setUserLanguage("en");
   trackSource = track.raw.source || track.__metadata.source
   trackSourceFormatted = trackSource.charAt(0).toUpperCase() + trackSource.slice(1)
   playEmbedData = {
      color: 0x26d9a0,
      title: `${getEmoji("music")} Playing ${track.title}`,
      url: track.url,
      desc: "by Manager :cd: https://manager-discord.netlify.app",
      img: track.thumbnail,
      fields: [
        {name: "Playing from", value: ":headphones: "+ trackSourceFormatted, inline: true},
        // { name: "Channel", value: `<#${voiceChannel}>`, inline: true },
        { name: "Duration", value: track.duration, inline: true },
        { name: "Publish Date", value: track.__metadata.uploadedAt || "Unknown", inline: true },
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
      embedName = eval(name + "EmbedData2")
   }
   if(track.source != "youtube"){
      embedName.img = ""
      embedName.thumb = track.thumbnail
   }
   tmpNewEmbed = getEmbed(embedName)
   console.log(tmpNewEmbed)
   // return tmpNewEmbed
}

module.exports = {useEmbed: useEmbed}

