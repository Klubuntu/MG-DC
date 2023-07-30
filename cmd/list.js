const {Player} = require("discord-player");
const playFunctions = require('./play')
const stateFunctions = require('./state')
const queueFunctions = require('./queue');
const helpFunctions = require('./help');
const { logAction } = require('../helpers/utils');
const {playEvent, skipEvent, pauseEvent, resumeEvent, seekEvent, trackAddEvent, stopEvent} = require('../helpers/actions');
const setUserLanguage = require('../helpers/lang_parser')

function setupCommands(client) {
   client.on("interactionCreate", async (interaction) => {
      const userLocale = interaction?.locale || 'en';
      console.log(userLocale)
      interaction.locale_config = await setUserLanguage(userLocale) || await setUserLanguage('en');
      /* Define Events */
      interaction.playEvent = playEvent;
      interaction.skipEvent = skipEvent;
      interaction.pauseEvent = pauseEvent;
      interaction.resumeEvent = resumeEvent;
      interaction.seekEvent = seekEvent;
      interaction.trackAddEvent = trackAddEvent;
      interaction.stopEvent = stopEvent;
      /* ------------- */
      if(interaction.isButton()) {
         btnID = interaction.customId
         if(btnID == "btn_playback"){
            helpFunctions(interaction, "playback")
         }
         else if(btnID == "btn_queue"){
            helpFunctions(interaction, "queue")
         }
         else if(btnID == "btn_support"){
            helpFunctions(interaction, "support")
         }
      }
      (async () => {
         const player = await new Player(interaction.client, {
            useLegacyFFmpeg: false,
            ytdlOptions: {
               quality: 'highestaudio',
               highWaterMark: 1 << 25,
               requestOptions: {
                  headers: {
                        cookie: process.env.YT_COOKIES || ''
                  }
               }
            }
         });
         playFunctions(interaction)
         stateFunctions(interaction)
         queueFunctions(interaction)
         helpFunctions(interaction)
         logAction(interaction) // Comment this to disable logging user commands
      })();
      if (!interaction.isChatInputCommand()) return;
   });
}

module.exports = {
   setupCommands
};