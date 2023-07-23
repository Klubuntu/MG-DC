const playFunctions = require('./play')
const stateFunctions = require('./state')
const queueFunctions = require('./queue');
const helpFunctions = require('./help');
const { logAction } = require('../helpers/utils');

function setupCommands(client) {
   client.on("interactionCreate", async (interaction) => {
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
         //logAction(interaction) // Comment this to disable logging user commands
      })();
      if (!interaction.isChatInputCommand()) return;
   });
}

module.exports = {
   setupCommands
};