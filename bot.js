const {Client, GatewayIntentBits, REST, Routes, ActivityType} = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates] });
const {config, commands} = require("./config")
// const {setupCommandsTest} = require("./tests/list")
const {setupCommands} = require("./cmd/list")
const rest = new REST({ version: '10' }).setToken(config.TOKEN);

try {
   console.log('🔄 [Action] Refreshing (/) commands.');
   (async () => {
      await rest.put(Routes.applicationCommands(config.CLIENTID), { body: commands });
   })();
   console.log('✅ [Action] Commands (/) refresh complete.');
} catch (err) {
   console.error(err);
}

client.on("ready", () => {
   console.log(`😎 [BOT] Loaded as ${client.user.tag}!`);
   setInterval(() => {
      client.user.setActivity(config.StatusList[Math.floor(Math.random() * config.StatusList.length)], {
            type: ActivityType.Watching
      });
   }, 15000);
   const timestamp = Date.now();
   client.rundate = timestamp
   // setupCommandsTest(client)
   setupCommands(client)
});

client.login(config.TOKEN);
