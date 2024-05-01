const {Player} = require("discord-player");
const playFunctions = require('./play')
const stateFunctions = require('./state')
const queueFunctions = require('./queue');
const helpFunctions = require('./help');
const setUserLanguage = require('../helpers/lang_parser')
const {playEvent, playlistAddEvent, skipEvent, pauseEvent, resumeEvent, seekEvent, trackAddEvent, stopEvent, playerError} = require('../helpers/actions');
const { logAction } = require('../helpers/utils');

function setupCommands(client) {
   client.on("interactionCreate", async (interaction) => {
      const userLocale = interaction?.locale || 'en';
      interaction.locale_config = await setUserLanguage(userLocale) || await setUserLanguage('en');
      /* Define Events */
      interaction.playEvent = playEvent;
      interaction.playlistAddEvent = playlistAddEvent;
      interaction.skipEvent = skipEvent;
      interaction.pauseEvent = pauseEvent;
      interaction.resumeEvent = resumeEvent;
      interaction.seekEvent = seekEvent;
      interaction.trackAddEvent = trackAddEvent;
      interaction.stopEvent = stopEvent;
      interaction.playerError = playerError; 
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
         await new Player(interaction.client, {
            useLegacyFFmpeg: false,
            ytdlOptions: {
               quality: 'highestaudio',
               filter: "audioonly",
               highWaterMark: 1 << 30,
               dlChunkSize: 0,
               requestOptions: {
                  headers: {
                        cookie: process.env.YT_COOKIES || ''
                        /*cookie: cs, authorization, "x-youtube-identity-token"*/
                  }
               }
            }
        });
         playFunctions(interaction)
         stateFunctions(interaction)
         queueFunctions(interaction)
         helpFunctions(interaction)
         //logAction(interaction) // Comment this to disable logging user commands
      })();
      if (!interaction.isChatInputCommand()) return;
   });
}

module.exports = {
   setupCommands
};
