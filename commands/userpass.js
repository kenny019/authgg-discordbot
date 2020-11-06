'use strict';

// imports
const config = require('../config.json');
const AuthGG = require('authgg-admin-api');
const API = new AuthGG.API(config.auth);

// main function
module.exports = {
	name: 'userpass',
	description: 'edit the user\'s password',
	usage: ' [username] [password]',
	guildOnly: false,
	adminOnly: true,
	execute(message, args) {
		if (!args.length) return message.reply('Specify the username!');
		if (args.length < 2) return message.reply('Specify the new password!');
		const username = args[0];
		const password = args[1];
		API.changeUserPass(username, password).then(res => {
			if (res) {
				return message.channel.send(`${username}'s password has been changed to \`${password}\``).then(msg => {
					msg.delete(10000);
					message.delete(10000);
				});
			}
		}).catch(err => {
			console.error(err);
			message.reply(err.message);
		});
	},
};