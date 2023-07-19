const testConnect = require("./testconnection");
const test1 = require("./test1");
const test2 = require("./test2");
const test3 = require("./test3");
const test4 = require("./test4");

function setupCommandsTest(client) {
   client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      (async () => {
         testConnect(interaction);
         test1(interaction);
         test2(interaction);
         test3(interaction);
         test4(interaction);
         const voice_channel_id = interaction.guild.members.cache.get(interaction.member.user.id).voice.channel_id
         console.log(voice_channel_id);
      })();
   });
}

module.exports = {
   setupCommandsTest
};