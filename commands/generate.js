'use strict';

// imports
const config = require('../config.json');
const AuthGG = require('authgg-admin-api');
const API = new AuthGG.API(config.auth);

// main function
module.exports = {
	name: 'generate',
	description: 'generate license',
	usage: ' [days] [amount] [level] [format?] [prefix?] [length?]',
	guildOnly: false,
	adminOnly: true,
	execute(message, args) {
		if (!args.length) return message.reply('usage: `!generate [days] [amount] [level] [format?] [prefix?] [length?]` to create one month license');
		const days = args[0];
		const amount = args[1];
		const level = args[2];
		const format = args[3] ? args[3] : 1;
		const prefix = args[4] ? args[4] : '';
		const length = args[5] ? args[5] : '';

		API.generateLicense(days, amount, level, format, prefix, length).then(data => {
			let tempStr = 'Generated: \n```\n';
			for (const elem in data) {
				tempStr += data[elem] + '\n';
			}
			tempStr += '```';
			return message.channel.send(tempStr.trim());
		}).catch(err => {
			console.error(err);
			return message.reply(err.message);
		});
	},
};