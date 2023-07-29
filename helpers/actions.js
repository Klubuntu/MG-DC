const { useEmbed } = require("./embeds");

function playEvent(i){
   track = i.track;
   track.config = i.locale_config
   console.log("[BOT] Playing", track.url);
   i.channel.send({embeds: [ useEmbed(track, "play")]});
}

// function setupEvents(player){
//    player.events.on('playerTrigger', (queue, track) => {
//       console.log("[BOT] Playing", track.url);
//       queue.metadata.channel.send("test");
//       queue.metadata.channel.send({embeds: [ useEmbed(track, "play")]});
//    });
//    player.events.on('audioTrackAdd', (queue, track) => {
//       if (!playCounts.has(track.url)) {
//          playCounts.set(track.url, 1);
//       } else {
//          const currentPlayCount = playCounts.get(track.url);
//          playCounts.set(track.url, currentPlayCount + 1);
//          if (!sentMessages.has(track.url)) {
//             // If the play count is greater than or equal to 2 and the message hasn't been sent yet.
//             queue.metadata.channel.send({ embeds: [useEmbed(track, "add")] }).catch(console.error);
//          }
//          else{
//             queue.metadata.channel.send("Added again, previous song added to the queue [sorry_multiply_bug]").catch(console.error);
//          }
//          sentMessages.add(track.url);
//       }
//       console.log("[BOT] Added to play", track.url);
//    });
//    // player.events.on('playerSkip', (queue, track) => {
//    //    queue.metadata.channel.send({embeds: [useEmbed(track, "skip")]})
//    // });
//    player.events.off('playerResume', (queue, track) => {
//       console.log("[DEBUG] Player resumed")
//    });
//    player.events.off('playerPause', (queue, track) => {
//       console.log("[DEBUG] Player paused")
//    });
//    player.events.on('playerError', (queue, track) => {
//       console.log("[BOT] Error playing")
//       try{
//          queue.metadata.channel.send({embeds: [useEmbed(track, "error")]});
//       }catch{
//          console.error("[BOT] Missing permission for send messages");
//       }
//    });
// }

module.exports = {playEvent: playEvent}
