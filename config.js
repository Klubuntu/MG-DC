module.exports = {
   config: {
      TOKEN: "[YOUR_TOKEN]",
      CLIENTID: "[YOUR_CLIENTID]",
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
         description: 'Play music from Youtube',
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
         name: 'help',
         description: 'View all commands'
      }
   ]
}
