const {getEmoji, getEmbed} = require("../helpers/utils");

async function help(interaction){
   opts_help = {
      color: 0x4f4e4c,
      title: `${getEmoji('book')} Help with Manager DC`,
      desc: ">> Bot Commands",
   }
   opts_help_playback = {
      color: 0x4f4e4c,
      title: `${getEmoji('music')} Playback commands`,
      desc: "Bot Commands",
      fields: [
         { name: '/play', value: 'Play music from Query or URL'},
         { name: '/progress', value: 'Display progress playing current song'},
         { name: '/pause', value: 'Pause current song'},
         { name: '/resume', value: 'Resume paused song'}
      ]
   }
   opts_help_queue = {
      color: 0x4f4e4c,
      title: `${getEmoji('skip')} Queue commands`,
      desc: "Bot Commands",
      fields: [
         { name: '/queue', value: 'Display songs in the Queue'},
         { name: '/skip', value: 'Skip next song in the Queue'},
         { name: '/seek', value: 'Forward song using seconds'},
         { name: '/moveto', value: 'Forward song using hours/minutes/seconds'},
         { name: '/stop', value: 'Stop playback songs / Clear Queue'}
      ]
   }
   opts_help_support = {
      color: 0xad0e0e,
      title: `${getEmoji('search')} Support Author`,
      fields: [
         { name: `${getEmoji('dc')} Report Bugs / Ideas - Support Server`, value: 'https://discord.gg/meKqTdUDDm'},
         { name: `${getEmoji('redbox')} Become a Patreon`, value: 'https://patreon.com/klubuntu'},
         { name: `${getEmoji('coffe')} Buy Me a Coffie`, value: 'https://www.buymeacoffee.com/klubuntu'},
         { name: `${getEmoji('tasks')} To-Do`, value: 'Add actions to player song, suppport other langs\nSupport other music services (like: Spotify, SoundCloud etc.)'},
         { name: `${getEmoji('pc')} Source Code`, value: 'https://github.com/klubuntu/MG-DC'}
      ]
   }
   getHelp = getEmbed(opts_help)
   getPlayback = getEmbed(opts_help_playback)
   getQueue = getEmbed(opts_help_queue)
   getSupport = getEmbed(opts_help_support)
   interaction.reply({embeds: [getHelp]})
   try {
     await interaction.channel.send({ embeds: [getPlayback] });
     await interaction.channel.send({ embeds: [getQueue] });
     await interaction.channel.send({ embeds: [getSupport] });
   } catch (e) {
     console.error("[DEBUG]", e);
     console.error("[BOT] Missing permission for send messages");
   }
}

function runtime(interaction){
   if (interaction.commandName === "help") {
      help(interaction);
   }
}

module.exports = runtime;