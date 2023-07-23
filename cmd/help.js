const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const {getEmoji, getEmbed} = require("../helpers/utils");

async function help(interaction, action=""){
   opts_help = {
      color: 0x4f4e4c,
      title: `${getEmoji('book')} Help with Manager DC`,
      desc: ">> Bot Commands",
      fields: [
         { name: '/help playback', value: 'View playback commands'},
         { name: '/help queue', value: 'View queue commands'},
         { name: '/help support', value: 'Support Project / Help Server'},
         { name: '/help info', value: 'View this message'},
         { name: 'You can click any button to view next commands', value:'[Colorful buttons below]'}
      ]
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
   if(action.length > 0){
      if(action == "playback"){
         interaction.reply({embeds: [getPlayback]});
      }
      else if(action == "queue"){
         interaction.reply({embeds: [getQueue]});
      }
      else if(action == "support"){
         interaction.reply({embeds: [getSupport]});
      }
   }
   else{
      const opt_help = interaction.options.getSubcommand()
      try {
         if(opt_help == "info"){
            const playback = new ButtonBuilder()
            .setCustomId('playback')
            .setLabel('🎧 Playback')
            .setStyle(ButtonStyle.Success);
   
            const queue = new ButtonBuilder()
            .setCustomId('queue')
            .setLabel('⏳ Queue')
            .setStyle(ButtonStyle.Secondary);
   
            const support = new ButtonBuilder()
            .setCustomId('support')
            .setLabel('💵 Support')
            .setStyle(ButtonStyle.Danger);
   
            const row = new ActionRowBuilder()
            .addComponents(playback, queue, support);
            interaction.reply({embeds: [getHelp], components: [row]})
         }
         else if(opt_help == "playback"){
            interaction.reply({embeds: [getPlayback]});
         }
         else if(opt_help == "queue"){
            interaction.reply({embeds: [getQueue]});
         }
         else if(opt_help == "support"){
            interaction.reply({embeds: [getSupport]});
         }
      } catch (e) {
         console.error("[DEBUG]", e);
         console.error("[BOT] Missing permission for reply to user");
      }
   }

}

function runtime(interaction){
   client = interaction.client
   client.on("interactionCreate", async (interaction) => {
      if(interaction.isButton()) {
         btnID = interaction.customId
         if(btnID == "playback"){
            help(interaction, "playback")
         }
         else if(btnID == "queue"){
            help(interaction, "queue")
         }
         else if(btnID == "support"){
            help(interaction, "support")
         }
      }
   });
   if (interaction.commandName === "help") {
      help(interaction);
   }
}

module.exports = runtime;