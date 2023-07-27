const {useMainPlayer} = require("discord-player");
require("@discord-player/extractor");
const {getEmoji} = require("../helpers/utils");
const {useEmbed} = require("../helpers/embeds");

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
    query = interaction.options.getString("query");
    await interaction.reply(
      `${getEmoji("search")} **Searching for**: <${query}>`
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
      interaction.channel.send(":x: Sorry, playing from this method not available at this time\n> If you playing outside youtube, remove `_` from your query `" + query + "`")
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
      console.log("[BOT] Sorry, This type video/live not supported")
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
  const player = interaction.player;
  const channel = interaction.member.voice.channel;
  let url = interaction.options.getString("url");
  console.log("[DEBUG]", url)
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
