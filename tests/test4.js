const {getEmbed} = require('../helpers/utils')

async function test4(interaction) {
 const options = {
  title: "Music Player",
  desc: "----------------",
  fields: { 
    name: 'Regular field title', 
    value: 'Some value here'
  }
 }
 myEmbed = getEmbed(options)
 interaction.reply({ embeds: [ myEmbed ] })
}

function runtime(interaction) {
  if (interaction.commandName === "test-embed") {
    test4(interaction);
  }
}

module.exports = runtime;
