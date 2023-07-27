const {getEmoji, getEmbed} = require("./utils");

function useEmbed(track, name) {
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
      title: `${getEmoji("skip")} Skipped Song`
   }
   if(name == "error"){
      embedName = eval("playEmbedData")
      embedName.img = null;
      embedName.fields= null;
      embedName.desc = ":x: Sorry, This type video/live not supported"

   }
   else if(name == "add"){
      embedName = eval("playEmbedData")
      embedName.title = `${getEmoji("clock")} Added to Queue ${track.title}`
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

