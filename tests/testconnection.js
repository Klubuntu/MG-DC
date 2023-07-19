async function testConnectAction(interaction) {
   await interaction.reply("Bot connected!");
}

function runtime(interaction) {
   if (interaction.commandName === "testconnect") {
      testConnectAction(interaction);
   }
}

module.exports = runtime;
