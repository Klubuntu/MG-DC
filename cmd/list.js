const {Player} = require("discord-player");
const playFunctions = require('./play')
const stateFunctions = require('./state')
const queueFunctions = require('./queue');
const helpFunctions = require('./help');
const { logAction } = require('../helpers/utils');
const setupEvents = require('../helpers/actions');
const setUserLanguage = require('../helpers/lang_parser')

function setupCommands(client) {
   client.on("interactionCreate", async (interaction) => {
      const userLocale = interaction?.locale || 'en';
      console.log(userLocale)
      interaction.locale_config = await setUserLanguage(userLocale);
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
         setupEvents(player)
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