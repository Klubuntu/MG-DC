const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const {getEmoji, getEmbed} = require("../helpers/utils");

async function help(interaction, action=""){
   const config = interaction.locale_config
   opts_help = {
      color: 0x4f4e4c,
      title: `${getEmoji('book')} ${config.help.info.title}`,
      desc: '>> ' + config.help.desc,
      fields: [
         { name: '/help playback', value: config.help.info.playback[0].value},
         { name: '/help queue', value: config.help.info.queue[0].value},
         { name: '/help support', value: config.help.info.support[0].value},
         { name: '/help info', value: config.help.info.info[0].value},
         { name: config.help.info.buttons[0].name, value: '[' + config.help.info.buttons[1].value + ']'}
      ]
   }
   opts_help_playback = {
      color: 0x4f4e4c,
      title: `${getEmoji('music')} ${config.help.playback.title}`,
      desc: config.help.desc,
      fields: [
         { name: '/play', value: config.help.playback.play[0].value},
         { name: '/play-online', value: config.help.playback.play_online[0].value},
         { name: '/progress', value: config.help.playback.progress[0].value},
         { name: '/pause', value: config.help.playback.pause[0].value},
         { name: '/resume', value: config.help.playback.resume[0].value},
         { name: '/volume', value: config.help.playback.volume[0].value}
      ]
   }
   opts_help_queue = {
      color: 0x4f4e4c,
      title: `${getEmoji('skip')} ${config.help.queue.title}`,
      desc: "Bot Commands",
      fields: [
         { name: '/queue', value: config.help.queue.queue[0].value},
         { name: '/skip', value: config.help.queue.skip[0].value},
         { name: '/seek', value: config.help.queue.seek[0].value},
         { name: '/moveto', value: config.help.queue.skip[0].value},
         { name: '/stop', value: config.help.queue.moveto[0].value}
      ]
   }
   opts_help_support = {
      color: 0xad0e0e,
      title: `${getEmoji('search')} ${config.help.support.title}`,
      fields: [
         { name: `${getEmoji('dc')} ${config.help.support.server}`, value: 'https://discord.gg/meKqTdUDDm'},
         { name: `${getEmoji('redbox')} ${config.help.support.patreon}`, value: 'https://patreon.com/klubuntu'},
         { name: `${getEmoji('coffe')} ${config.help.support.coffee}`, value: 'https://www.buymeacoffee.com/klubuntu'},
         { name: `${getEmoji('tasks')} ${config.help.support.to_do}`, value: 'Add actions to player\nSupport other languages (Starting from: :flag_pl: PL, :flag_de: DE, :flag_fr: FR, :flag_jp: JP)\n If Detect playlist, add all songs to queue, more commands to manage queue'},
         { name: `:bulb: ${config.help.support.help_code[0].name}`, value: `${config.help.support.help_code[1].issues}\nhttps://github.com/Klubuntu/MG-DC/issues`},
         { name: `${getEmoji('pc')} ${config.help.support.source_code}`, value: 'https://github.com/klubuntu/MG-DC'},
         { name: `:books: ${config.help.support.other_projects}`, value: ':deciduous_tree: Radio Garden: https://github.com/klubuntu/radio-garden-dc'}
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
            const btn_playback = new ButtonBuilder()
            .setCustomId('btn_playback')
            .setLabel('🎧 ' + config.help.info.buttons[2].playback)
            .setStyle(ButtonStyle.Success);
   
            const btn_queue = new ButtonBuilder()
            .setCustomId('btn_queue')
            .setLabel('⏳ ' + config.help.info.buttons[3].queue)
            .setStyle(ButtonStyle.Secondary);
   
            const btn_support = new ButtonBuilder()
            .setCustomId('btn_support')
            .setLabel('💵 ' + config.help.info.buttons[4].support)
            .setStyle(ButtonStyle.Danger);
   
            const row = new ActionRowBuilder()
            .addComponents(btn_playback, btn_queue, btn_support);
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
         console.error(`[BOT] ${help.messages.missing_permission}`);
      }
   }

}

function runtime(interaction, action=""){
   if (interaction.commandName === "help") {
      help(interaction);
   }
   else if (action.length > 0){
      help(interaction, action);
   }
}

module.exports = runtime;