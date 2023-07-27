module.exports = {
   config: {
      TOKEN: "OTQxNDEyNTkwNzQ2MjI2NzEx.GYh7DN.G4A-Z7Q5AvGHH9KBvr_9Q3FZgVyczWdu1_h360",
      CLIENTID: "941412590746226711",
      StatusList: ["🧩 MG v3: /help", "🎁 Open-source code", "🤖 by Klubuntu"]
   },
   configpublic: {
      TOKEN: "OTE5OTQwNjIwNDU2NDQzOTM1.GKvdvJ.ugOtldBK2obmbUoK0YHT-4vx_QQdLFdPwW5UGI",
      CLIENTID: "919940620456443935",
      StatusList: ["🧩 MG v3: /help", "🎁 Open-source code", "🤖 by Klubuntu"]
   },
   commands_test: [
      {
         name: 'testconnect',
         description: 'Connection Test!',
      },
      {
         name: 'test-player',
         description: 'Internal test1',
      },
      {
         name: 'test-query',
         description: 'Internal test2',
         options: [
            {
                name: 'query',
                description: 'Query / URL',
                type: 3,
                required: true,
            },
        ],  
      },
      {
         name: 'test-play-queue',
         description: 'Internal test3',
         options: [
            {
                name: 'query',
                description: 'Query / URL',
                type: 3,
                required: true,
            },
        ], 
      },
      {
         name: 'test-pause',
         description: 'Pause Internal test',
      },
      {
         name: 'test-resume',
         description: 'Resume Internal test',
      },
      {
         name: 'test-stop',
         description: 'Stop Internal test',
      },
      {
         name: 'test-embed',
         description: 'Internal test4',
      }
   ],
   commands: [
      {
         name: 'play',
         description: 'Play music using query or URL',
         options: [
            {
               name: 'query',
               description: 'Query / URL',
               type: 3,
               required: true,
            },
            {
               name: 'source',
               description: 'Select Media Service (only for search)',
               type: 3,
               required: false,
               choices: [
                  {
                     name: "Spotify",
                     value: "spotifySearch"
                  },
                  {
                     name: "YouTube",
                     value: "youtube"
                  },
                  {
                     name: "Soundcloud",
                     value: "soundcloud"
                  },
                  {
                     name: "Apple Music",
                     value: "appleMusicSearch"
                  },
                  {
                     name: "Facebook",
                     value: "facebook"
                  },
                  {
                     name: "ReverbNation",
                     value: "reverbnation"
                  },
                  {
                     name: "Vimeo",
                     value: "vimeo"
                  }
              ]
            },
         ],
      },
      {
         name: "play-online",
         description: "Play M3U/RTMP content from url",
         options: [
            {
               name: 'url',
               description: 'URL',
               type: 3,
               required: true,
            },
         ]
      },
      {
         name: 'pause',
         description: 'Pause playing song'
      },
      {
         name: 'resume',
         description: 'Resume paused song'
      },
      {
         name: 'skip',
         description: 'Skip current song'
      },
      {
         name: 'stop',
         description: 'Stop playing music / Clear queue'
      },
      {
         name: 'seek',
         description: 'Rewind music (in seconds)',
         options: [
            {
               name: 'seconds',
               description: 'Seconds to skip in the song',
               type: 4,
               required: true,
            },
         ],
      },
      {
         name: 'moveto',
         description: 'Rewind music (in hour/min)',
         options: [
            {
               name: 'hours',
               description: 'Hours to move in the song',
               type: 4,
            },
            {
               name: 'minutes',
               description: 'Minutes to move in the song',
               type: 4,
            },
            {
               name: 'seconds',
               description: 'Seconds to move in the song',
               type: 4,
            }
        ],
      },
      {
         name: 'progress',
         description: 'Current song progress'
      },
      {
         name: 'queue',
         description: 'Display the next songs in the queue',
      },
      {
         name: 'volume',
         description: 'Check/Change playing song volume',
         options: [
            {
               name: "level",
               description: "Volume Level (max 200)",
               type: 4,
            },
         ]
      },
      {
         name: "help",
         description: "View all commands",
         options: [
            {
               name: "playback",
               description: "Playback Commands",
               type: 1,
            },
            {
               name: "queue",
               description: "Queue Commands",
               type: 1,
            },
            {
               name: "support",
               description: "Support Author",
               type: 1,
            },
            {
               name: "info",
               description: "Commands info",
               type: 1,
            },
         ]
      },
   ]
}