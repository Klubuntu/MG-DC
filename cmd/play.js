const {createAudioResource, createAudioPlayer, joinVoiceChannel} = require('@discordjs/voice');
const {useQueue, useMainPlayer} = require("discord-player");
require("@discord-player/extractor");
const {getEmoji} = require("../helpers/utils");
const {useEmbed} = require("../helpers/embeds");

async function play(interaction) {
  const config = interaction.locale_config
  const player = interaction.player;
  await player.extractors.loadDefault();
  const channel = interaction.member.voice.channel;

  function removeQueryFromURL(url) {
    var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    var questionMarkIndex = url.indexOf("?");
    if (questionMarkIndex !== -1 && url.match(urlPattern)) {
      return url.split("?")[0];
    }
    return url;
  }

  if (!channel) {
    msg_user_not_voicechannel = "❌ " + config.messages.user_not_connected;
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
    query = removeQueryFromURL(interaction.options.getString("query"));
    await interaction.reply(
      `${getEmoji("search")} **${config.messages.play[0].searching}**: <${query}>`
    );
    const searchService = interaction.options?._hoistedOptions[1]?.value;
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
      track_duration = res._data.tracks[0].duration;
    }
    catch(e){
      console.error("[DEBUG MESSAGE FOR DEV ONLY - REPORT TO AUTHOR]: ", e);
      interaction.channel.send(`:x: ${config.messages.play[7].method_no_available}\n> ${config.messages.play[8].change_prefix}` + "`" + query + "`")
      return;
    }
    const voiceChannel = interaction.guild.members.cache.get(
      interaction.member.user.id
    ).voice.channelId;
    try{
      await player.play(channel, track_url, {
        nodeOptions: {
          metadata: interaction,
        },
      });
      interaction.track = res._data.tracks[0];
      getQueue = useQueue(interaction.guild.id);
      if(getQueue){
        if(getQueue.size > 0){
          interaction.trackAddEvent(interaction);
        }
        else{
          interaction.playEvent(interaction);
        }
      }
    }
    catch{
      console.log(`[BOT] ${config.messages.play[6].unsupported}`)
      interaction.followUp({embeds: [useEmbed(res._data.tracks[0], "error")]})
    }
  }
}

function playURL(interaction){
  const config = interaction.locale_config
  const player = interaction.legacyPlayer
  const channel = interaction.member.voice.channel;
  if (!channel) {
    msg_user_not_voicechannel = "❌ " + config.messages.user_not_connected;
    console.log(msg_user_not_voicechannel);
    interaction.reply(msg_user_not_voicechannel);
    userJoined = false;
    return;
  }
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: interaction.member.voice.channel.guild.id,
    adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
  });
  
  let url = interaction.options.getString("url");
  player.play(createAudioResource(url), { type: 'unknown' });
  connection.subscribe(player);
  interaction.legacyPlayer.test = player
  interaction.track = {
    raw: {},
    __metadata: {
      source: "stream URL",
      uploadedAt: ""
    },
    title: "Stream URL",
    duration: `${getEmoji("rec")} LIVE`,
    url: "https://manager-discord.netlify.app",
    thumbnail: "",
  }
  interaction.reply(`${config.messages.play[1].playing} <${url}>`);
  interaction.playEvent(interaction);
}

function runtime(interaction) {
  const player = useMainPlayer();
  const legacy_player = createAudioPlayer();
  interaction.player = player;
  interaction.legacyPlayer = legacy_player;
  if (interaction.commandName === "play") {
    play(interaction);
  }
  if (interaction.commandName === "play-online"){
    playURL(interaction);
  }
}

module.exports = runtime;
