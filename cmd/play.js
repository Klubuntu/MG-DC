const { createAudioResource, createAudioPlayer, joinVoiceChannel } = require('@discordjs/voice');
const {useMainPlayer} = require("discord-player");
require("@discord-player/extractor");
const {getEmoji} = require("../helpers/utils");
const {useEmbed} = require("../helpers/embeds");

async function play(interaction) {
  const config = interaction.locale_config
  const player = interaction.player;
  await player.extractors.loadDefault();
  const channel = interaction.member.voice.channel;
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
    query = interaction.options.getString("query");
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
    catch{
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
    }
    catch(e){
      console.error(e);
      console.log(`[BOT] ${config.messages.play[6].unsupported}`)
      interaction.followUp({embeds: [useEmbed(res._data.tracks[0], "error")]})
    }
  }
}

const fetch = require('node-fetch');

// Function to fetch the M3U URL and extract the audio URL
async function getAudioUrlFromM3U(m3uUrl) {
  try {
    const response = await fetch(m3uUrl);
    const m3uData = await response.text();
    // Assuming the audio URL is the first line of the M3U file
    const audioUrl = m3uData.split('\n')[0].trim();
    return audioUrl;
  } catch (error) {
    console.error('Error fetching M3U URL:', error);
    return null;
  }
}

async function playURL(interaction){
  let url = interaction.options.getString("url");
  const connection = joinVoiceChannel({
    channelId: interaction.member.voice.channel.id,
    guildId: interaction.member.voice.channel.guild.id,
    adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
  });
  const player = createAudioPlayer();
  player.play(createAudioResource(url), { type: 'unknown' });
  connection.subscribe(player);
  interaction.reply('Now playing audio!');
  
}

function runtime(interaction) {
  const player = useMainPlayer();
  interaction.player = player;
  if (interaction.commandName === "play") {
    play(interaction);
  }
  if (interaction.commandName === "play-online"){
    playURL(interaction);
  }
}

module.exports = runtime;
