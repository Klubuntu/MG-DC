// PlayerEvents.js

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
      i.reply({ embeds: [useEmbed(track, "")] });
   }
}

module.exports = new PlayerEvents();
