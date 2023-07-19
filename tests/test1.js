const { Player } = require("discord-player");
const {YoutubeExtractor} = require("@discord-player/extractor")

async function test1(interaction) {
   await interaction.reply("test")
   const player = new Player(interaction.client);
   await player.extractors.register(YoutubeExtractor, {});
   const channel = interaction.member.voice.channel;
   if(!channel){
      console.log("User not joined to voice channel")  
   }else{
      //console.log(channel)
      const { track } = await player.play(channel, "random kpop 2023", {
         nodeOptions: {
             metadata: interaction
         }
     });
     console.log(track)
   }
}

function runtime(interaction) {
   if (interaction.commandName === "test-player") {
      test1(interaction)
   }
}

module.exports = runtime;
