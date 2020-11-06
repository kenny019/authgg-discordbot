'use strict';

// imports
const config = require('../config.json');
const AuthGG = require('authgg-admin-api');
const API = new AuthGG.API(config.auth);

// main function
module.exports = {
	name: 'delete',
	description: 'delete user/license',
	usage: ' [user/license] [input]',
	guildOnly: false,
	adminOnly: true,
	execute(message, args) {
		if (!args.length) return message.reply('Specify the user/license!');
		const selection = args[0];
		const input = args[1];

		if (!input) return message.reply('Input a valid value: `!delete user admin`');
		switch (selection) {
		case 'user':
			API.deleteUser(input).then(res => {
				if (res) return message.channel.send(`${input} has been succesfully deleted.`);
			}).catch(err => {
				console.error(err);
				message.reply(err.message);
			});
			break;
		case 'license':
			API.deleteLicense(input).then(res => {
				if (res) return message.channel.send(`${input} has been succesfully deleted.`);
			}).catch(err => {
				console.error(err);
				message.reply(err.message);
			});
			break;
		default:
			message.reply('Specify the user/license!');
			break;
		}

	},
};