const { useMainPlayer, GuildQueue, GuildQueuePlayerNode, useQueue } = require("discord-player");
const { YoutubeExtractor } = require("@discord-player/extractor");

async function test3(interaction) {
   const player = interaction.player;
   await player.extractors.register(YoutubeExtractor, {});
   const channel = interaction.member.voice.channel;

   if (!channel) {
      console.log("User not joined to voice channel");
   } else {
      options = {
         volume: 100
      }
      function getQueue(){
         try{
            const queue = useQueue(interaction.guild.id);
            return queue
         }
         catch{
            console.log("[DEBUG] Queue not exists, creating new")
            const queue = new GuildQueue(interaction.player, options)
            return queue
         }
      }
      const queue = getQueue()
      await interaction.reply("Waiting for music");

   query = interaction.options.getString("query");
   res = await player.search(query);
   console.log(res._data.tracks[0].url);
   track_url = res._data.tracks[0].url;
    const { track } = await player.play(channel, track_url, {
      nodeOptions: {
        metadata: interaction,
      },
    });
    console.log("[BOT] Next in Queue in", interaction.guild.name)
    try{
      tracks = queue.tracks.toArray()
      tracks_raw = tracks[0].raw
      for (const track of tracks){
         console.log("Track >", track.raw.title)
       }
    }
    catch{
      console.error("[DEBUG] Empty Queue")
    }

  }
}

async function pause(interaction) {
  await interaction.reply("Test complete");
  queue = useQueue(interaction.guild.id)
  if(queue){
   console.log("[DEBUG] Queue exists")
   t_queue = new GuildQueuePlayerNode(queue)
   t_queue.pause()
  }
}

async function resume(interaction) {
   await interaction.reply("Test complete");
   queue = useQueue(interaction.guild.id)
   if(queue){
    console.log("[DEBUG] Queue exists")
    t_queue = new GuildQueuePlayerNode(queue)
    t_queue.resume()
   }
 }

function runtime(interaction) {
  const player = useMainPlayer();
  interaction.player = player;
  if (interaction.commandName === "test-play-queue") {
    test3(interaction);
  }
  if (interaction.commandName === "test-pause") {
    pause(interaction);
  }
  if (interaction.commandName === "test-resume") {
    resume(interaction);
  }
}

module.exports = runtime;
