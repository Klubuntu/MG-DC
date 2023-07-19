const { Player } = require("discord-player");
const {YoutubeExtractor} = require("@discord-player/extractor")
const {config} = require("../config")

async function test2(interaction) {
   await interaction.reply("test")
   const player = interaction.player
   await player.extractors.register(YoutubeExtractor, {});
   const channel = interaction.member.voice.channel;
   console.log(player)
   if(!channel){
      console.log("User not joined to voice channel")  
   }else{
      //query = "random kpop 2023"
      query = interaction.options._hoistedOptions[0].value
      const { track } = await player.play(channel, query, {
         nodeOptions: {
             metadata: interaction
         }
      });
   }
}

async function stop(interaction) {
   await interaction.reply("Test complete")
   const voiceChannel = interaction.client.voice.adapters.get(interaction.guild.id);
   try{
      console.log(voiceChannel.destroy())
   }
   catch{
      console.error("[Debug] Can't stop - user not connected to channel")
   }

}

function runtime(interaction) {
   const player = new Player(interaction.client);
   interaction.player = player;
   if (interaction.commandName === "test-query") {
      test2(interaction)
   }
   if (interaction.commandName === "test-stop") {
      stop(interaction)
   }

}

module.exports = runtime;
