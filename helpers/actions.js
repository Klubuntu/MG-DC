const { useEmbed } = require("./embeds");

class PlayerEvents {
   playEvent(i) {
      const track = i.track;
      track.config = i.locale_config;
      console.log("[BOT] Playing", track.url);
      i.channel.send({ embeds: [useEmbed(track, "play")] });
   }

   trackAddEvent(i) {
      const track = i.track;
      track.config = i.locale_config;
      console.log("[BOT] Added to play", track.url);
      i.channel.send({ embeds: [useEmbed(track, "add")] }).catch(console.error);
   }

   playlistAddEvent(i) {
      const playlist = i.playlist;
      playlist.config = i.locale_config;
      console.log("[BOT] Playlist added to play", playlist.url);
      i.channel.send({ embeds: [useEmbed(playlist, "playlistAdd")] });
   }


   skipEvent(i) {
      const track = i.track;
      track.config = i.locale_config;
      console.log("[BOT] Skipped Track", track.url);
      i.reply({ embeds: [useEmbed(track, "skip")] });
   }

   pauseEvent(i) {
      const track = i.track;
      track.config = i.locale_config;
      console.log("[BOT] Paused Track", track.url);
      i.reply({ embeds: [useEmbed(track, "pause")] });
   }

   resumeEvent(i) {
      const track = i.track;
      track.config = i.locale_config;
      console.log("[BOT] Resumed Track", track.url);
      i.reply({ embeds: [useEmbed(track, "resume")] });
   }

   seekEvent(i) {
      const track = i.track;
      track.config = i.locale_config;
      track.other = i.other;
      console.log("[BOT] Seeked Track", track.url);
      i.reply({ embeds: [useEmbed(track, "seek")] });
   }

   stopEvent(i) {
      const track = i.track;
      track.config = i.locale_config;
      console.log("[BOT] Stopped Playing");
      i.reply({ embeds: [useEmbed(track, "stop")] });
   }
   
   playerError(i){
      const track = i.track;
      track.config = i.locale_config;
      console.log("[BOT] Playing error");
      i.reply({ embeds: [useEmbed(track, "stop")] });
   }
}

module.exports = new PlayerEvents();
