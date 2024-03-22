
const { createAudioResource, createAudioPlayer, joinVoiceChannel } = require('@discordjs/voice');
const { useQueue, useMainPlayer } = require("discord-player");
require("@discord-player/extractor");
const { getEmoji } = require("../helpers/utils");
const { useEmbed } = require("../helpers/embeds");
//const fetch = require('node-fetch');
var http = require('http');
const { Readable } = require('stream');
const axios = require('axios');
const { Parser } = require('m3u8-parser');


async function play(interaction) {
  const config = interaction.locale_config
  const player = interaction.player;
  await player.extractors.loadDefault();
  const channel = interaction.member.voice.channel;

  interaction.client.on('error', (error) => {
    console.error(`Error occurred while playing track ${track.title}:`, error);
  });

  if (!channel) {
    msg_user_not_voicechannel = ":x: " + config.messages.user_not_connected;
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
    try {
      track_url = res._data.tracks[0].url;
      track_duration = res._data.tracks[0].duration;
    }
    catch (e) {
      console.error("[DEBUG MESSAGE FOR DEV ONLY - REPORT TO AUTHOR]: ", e);
      interaction.channel.send(`:x: ${config.messages.play[7].method_no_available}\n> ${config.messages.play[8].change_prefix}` + "`" + query + "`")
    }
    const voiceChannel = interaction.guild.members.cache.get(
      interaction.member.user.id
    ).voice.channelId;
    try {
      await player.play(channel, track_url, {
        nodeOptions: {
          metadata: interaction,
        },
      });
      interaction.track = res._data.tracks[0];
      getQueue = useQueue(interaction.guild.id);
      if (getQueue) {
        if (getQueue.size > 0) {
          interaction.trackAddEvent(interaction);
        }
        else {
          interaction.playEvent(interaction);
        }
      }
    } catch (e) {
      console.log(`[BOT] ${config.messages.play[6].unsupported}`)
      interaction.followUp({ embeds: [useEmbed(res._data.tracks[0], "error")] })
    }
  }
}

function isURL(str) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(str);
}

async function extractContentPlaylist(url) {
  try {
    // Fetch the playlist file
    const response = await axios.get(url);
    const playlistContent = response.data;
    // Check if it's a PLS file
    if (playlistContent.startsWith('[playlist]')) {
      // Extract URLs from PLS
      const urls = [];
      const lines = playlistContent.split('\n');
      lines.forEach(line => {
        if (line.startsWith('File')) {
          const parts = line.split('=');
          if (parts.length === 2) {
            urls.push(parts[1].trim());
          }
        }
      });
      return urls;
    } else {
      // Initialize the parser for M3U
      const parser = new Parser();
      parser.push(playlistContent);
      parser.end();
      // Extract URLs from the parsed M3U playlist
      const urls = [];
      const { items } = parser.manifest;
      items.forEach(item => {
        if (item.url) {
          urls.push(item.url);
        }
      });
      return urls;
    }
  } catch (error) {
    console.error('Error extracting URLs from playlist:', error);
    return [];
  }
}

async function playURL(interaction) {
  const config = interaction.locale_config
  const channel = interaction.member.voice.channel
  const player = interaction.legacyPlayer
  if (!channel) {
    msg_user_not_voicechannel = ":x: " + config.messages.user_not_connected;
    console.log(msg_user_not_voicechannel);
    interaction.reply(msg_user_not_voicechannel);
    userJoined = false;
    return;
  }
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: false,
    selfMute: false,
  });

  let online_url = interaction.options.getString("url");
  if (!isURL(online_url)) {
    interaction.reply(":x: " + config.messages.invalid_url);
    return;
  }

  const isPlaylistUrl = online_url.endsWith('.pls') || online_url.endsWith('.m3u') || online_url.endsWith('.m3u8');
  let playing_url;
  if (isPlaylistUrl) {	
    let playlist_urls = await extractContentPlaylist(online_url)
    playing_url = playlist_urls[0]
  } else {
    playing_url = online_url
  }

  const isReadable = true;
  try {
    const res = await fetch(playing_url);
    if (res.ok && isReadable) {
      connection.subscribe(player);
      const audio = Readable.fromWeb(res.body);
      const resource = createAudioResource(audio);
      player.play(resource);
    } else if (!isReadable) {
      connection.subscribe(player);
      const resource = createAudioResource(playing_url);
      player.play(resource);
    }
  } catch (e) {
    console.error("[BOT] Unknown Error:", e)
    interaction.reply(":x: " + config.messages.unsupported_url)
    return;
  }

  interaction.legacyPlayer.test = player
  interaction.track = {
    raw: {},
    __metadata: {
      source: "stream URL",
      uploadedAt: ""
    },
    title: "Stream URL",
    duration: `${getEmoji("rec")} LIVE`,
    url: online_url,
    thumbnail: "",
  }
  interaction.reply(`${config.messages.play[1].playing} <${online_url}>`);
  interaction.playEvent(interaction);
}

function runtime(interaction) {
  interaction.player = useMainPlayer();
  interaction.legacyPlayer = createAudioPlayer();
  if (interaction.commandName === "play") {
    play(interaction);
  }
  if (interaction.commandName === "play-online") {
    playURL(interaction);
  }
}

module.exports = runtime;
