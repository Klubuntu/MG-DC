const playFunctions = require('./play')
const stateFunctions = require('./state')
const queueFunctions = require('./queue');
const helpFunctions = require('./help');
const { logAction } = require('../helpers/utils');

function setupCommands(client) {
   client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      (async () => {
         playFunctions(interaction)
         stateFunctions(interaction)
         queueFunctions(interaction)
         helpFunctions(interaction)
         // logAction(interaction) // Comment this to disable logging user commands
      })();
   });
}

module.exports = {
   setupCommands
};