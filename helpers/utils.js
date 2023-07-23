const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const version = "v3.0 BETA 2"

function getEmbed(opt){
   const embed = new EmbedBuilder()
	.setColor(opt.color || 0xFFFFFF)
	.setTitle(opt.title || "Manager Discord")
	.setURL(opt.url || "https://manager-discord.netlify.app")
	.setAuthor(opt.author || null)
	.setDescription(opt.desc || "Work with ❤️ Love music")
	.setThumbnail(opt.thumb || null)
	.addFields(opt.fields || { name: 'by Manager :cd:', value: 'https://manager-discord.netlify.app'})
	.setImage(opt.img || null)
	.setTimestamp(opt.timestamp || null)
	.setFooter(opt.footer || {text: `(C) 2023 - Manager ${version} by Klubuntu`, url: 'https://manager-discord.netlify.app'});
   return embed
}

function getEmoji(emojiname){
	switch(emojiname){
		case 'love':
			return ':heart';
		case 'search':
			return ':mag:';
		case 'music':
			return ':musical_note:';
		case 'pause':
			return ':pause_button:';
		case 'play':
			return ':arrow_forward:';
		case 'skip':
			return ':fast_forward:';
		case 'stop':
			return ':stop_button:';
		case 'book':
			return ':bookmark:';
		case 'setup':
			return ':gear:'
		case 'dc':
			return ':regional_indicator_d: :regional_indicator_c:'
		case 'redbox':
			return ':red_square:'
		case 'coffe':
			return ':coffee:'
		case 'tasks':
			return ':pencil:'
		case 'pc':
			return ':computer:'
		case 'gcheck':
			return ':white_check_mark:'
		default:
			return '';
	}
}

function getSeconds(h=0, m=0){
	sec_hours = 3600 * h
	sec_min = 60 * m
	seconds = sec_hours + sec_min
	return seconds
}

function __saveLogs(data, timestamp){
	if (!fs.existsSync("logs")) {
		fs.mkdirSync("logs");
		console.log("[LOG] Creating new logs folder")
	}
	fs.appendFile(`logs/mg-${timestamp}.log`, data + "\n", (err) => {
		if (err) {
		  console.error('Error with saving logs:', err);
		  return;
		}
	 });
}

function logAction(interaction){
	timestamp = interaction.client.rundate
	const currentDate = new Date();
	y = currentDate.getFullYear()
	m = currentDate.getMonth() + 1
	d = currentDate.getDate()
	hh = currentDate.getHours()
	mm = currentDate.getMinutes()
	formated_date = `${y}-${m}-${d} ${hh}:${mm}`
	__saveLogs(`-- ${formated_date} --`, timestamp)
	console.log(`[ACTION] User > ${interaction.member.user.username} in [${interaction.guild.name}]`)
	__saveLogs(`[ACTION] User > ${interaction.member.user.username} in [${interaction.guild.name}]`, timestamp)
	console.log(`[BOT] Command ${interaction}`)
	__saveLogs(`[BOT] Command ${interaction}`, timestamp)
}

module.exports = {
	getEmbed: getEmbed,
	getEmoji: getEmoji,
	getSeconds: getSeconds,
	logAction: logAction,
}