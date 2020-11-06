'use strict';

// imports
const config = require('../config.json');
const AuthGG = require('authgg-admin-api');
const API = new AuthGG.API(config.auth);

// main function
module.exports = {
	name: 'reset',
	description: 'reset hwid of user',
	usage: ' [username]',
	guildOnly: false,
	adminOnly: true,
	execute(message, args) {
		if (!args.length) return message.reply('Specify the user!');
		const username = args[0];

		API.resetHWID(username).then(res => {
			if (res) return message.channel.send(`${username}'s hwid has been succesfully reset!`);
		}).catch(err => {
			console.error(err);
			message.reply(err.message);
		});

	},
};