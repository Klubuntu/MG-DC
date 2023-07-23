const {useMainPlayer, GuildQueue, useQueue} = require("discord-player");
require("@discord-player/extractor");
const { getEmoji, getEmbed } = require("../helpers/utils");

async function play(interaction) {
  const player = interaction.player;
  await player.extractors.loadDefault();
  const channel = interaction.member.voice.channel;
  if (!channel) {
    msg_user_not_voicechannel = "❌ User not joined to voice channel";
    console.log(msg_user_not_voicechannel);
    interaction.reply(msg_user_not_voicechannel);
    userJoined = false;
  } else {
    userJoined = true;
  }
  if (userJoined) {
    options = {
      volume: 100,
    };
    function getQueue() {
      let queue = useQueue(interaction.guild.id);
      if (!queue) {
        console.log("[DEBUG] Queue does not exist, creating new");
        queue = new GuildQueue(interaction.player, options);
      }
      return queue;
    }

    const queue = getQueue();
    query = interaction.options.getString("query");
    await interaction.reply(
      `${getEmoji("search")} **Searching for**: <${query}>`
    );
    const searchService = interaction.options?._hoistedOptions[1]?.value;
    const searchServiceName = searchService.charAt(0).toUpperCase() + searchService.slice(1).replaceAll("Search", "");
    if (searchService && searchService.length > 0) {
      options = {
        fallbackSearchEngine: searchService,
      };
      res = await player.search(query, options);
    } else {
      res = await player.search(query);
    }

    try{
      track_url = res._data.tracks[0].url;
      track_name = res._data.tracks[0].title;
      track_duration = res._data.tracks[0].duration;

    }
    catch{
      interaction.channel.send(":x: Sorry, playing from this method not available at this time ")
      return '';
    }

    if(track_duration == "0:00"){
      track_duration = "Live"
    }
    track_publishDate = res._data.tracks[0].__metadata.uploadedAt || "Unavailable";
    thumbnail_url = res._data.tracks[0].thumbnail;
    const voiceChannel = interaction.guild.members.cache.get(
      interaction.member.user.id
    ).voice.channelId;
    console.log("[BOT] Playing", track_url);
    opt_playMsg = {
      color: 0x26d9a0,
      title: `${getEmoji("music")} Playing ${track_name}`,
      url: track_url,
      desc: "by Manager :cd: https://manager-discord.netlify.app",
      img: thumbnail_url,
      fields: [
        {name: "Playing from", value: ":headphones: "+searchServiceName || "Spotify", inline: true},
        // { name: "Channel", value: `<#${voiceChannel}>`, inline: true },
        { name: "Duration", value: track_duration, inline: true },
        { name: "Publish Date", value: track_publishDate, inline: true },
      ],
    };
    if(res._data.queryType != "youtube"){
      opt_playMsg.img = null;
      opt_playMsg.thumb = thumbnail_url
    }
    try {
      playMsg = getEmbed(opt_playMsg);
      await interaction.channel.send({ embeds: [playMsg] });
    } catch (e) {
      console.error("[BOT] Missing permission for send messages");
    }
    try{
      await player.play(channel, track_url, {
        nodeOptions: {
          metadata: interaction,
        },
      });
    }
    catch{
      console.log("[BOT] Sorry, This type video/live not supported")
      opt_playMsg.img = null;
      opt_playMsg.fields = null;
      opt_playMsg.desc =  ":x: Sorry, This type video/live not supported"
      exceptMsg = getEmbed(opt_playMsg);
      interaction.followUp({embeds: [exceptMsg]})
    }
  }
}

function runtime(interaction) {
  const player = useMainPlayer();
  interaction.player = player;
  if (interaction.commandName === "play") {
    play(interaction);
  }
}

module.exports = runtime;
