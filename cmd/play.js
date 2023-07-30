const {useMainPlayer} = require("discord-player");
require("@discord-player/extractor");
const {getEmoji, getEmbed} = require("../helpers/utils");

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
      track_name = res._data.tracks[0].title;
      track_duration = res._data.tracks[0].duration;
    }
    catch{
      interaction.channel.send(`:x: ${config.messages.play[7].method_no_available}\n> ${config.messages.play[8].change_prefix}` + "`" + query + "`")
      return '';
    }
    if(track_duration == "0:00"){
      track_duration = "Live"
    }
    track_publishDate = res._data.tracks[0].__metadata.uploadedAt || "Unavailable";
    thumbnail_url = res._data.tracks[0].thumbnail;
    track_source = res._data.extractor?.constructor.name.replaceAll("Extractor", "")
    console.log(track_source)
    const voiceChannel = interaction.guild.members.cache.get(
      interaction.member.user.id
    ).voice.channelId;
    console.log("[BOT] Playing", track_url);
    opt_playMsg = {
      color: 0x26d9a0,
      title: `${getEmoji("music")} ${config.messages.play[1].playing} ${track_name}`,
      url: track_url,
      desc: "by Manager :cd: https://manager-discord.netlify.app",
      img: thumbnail_url,
      fields: [
        {name: config.messages.play[2].playing_from, value: ":headphones: "+ track_source, inline: true},
        // { name: "Channel", value: `<#${voiceChannel}>`, inline: true },
        { name: config.messages.play[3].duration, value: track_duration, inline: true },
        { name: config.messages.play[4].publish_date, value: track_publishDate || config.messages.play[5].unknown, inline: true },
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
      console.error(`[BOT] ${config.messages.missing_permission}`);
    }
    try{
      await player.play(channel, track_url, {
        nodeOptions: {
          metadata: interaction,
        },
      });
    }
    catch{
      console.log(`[BOT] ${config.messages.play[6].unsupported}`)
      opt_playMsg.img = null;
      opt_playMsg.fields = null;
      opt_playMsg.desc =  `:x: ${config.messages.play[6].unsupported}`
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
