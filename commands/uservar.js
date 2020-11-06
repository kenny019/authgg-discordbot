'use strict';

// imports
const config = require('../config.json');
const AuthGG = require('authgg-admin-api');
const API = new AuthGG.API(config.auth);

// functions
function ConcatVar(data) {
	const variables = data.slice(1, data.length);
	let concatStr = '';
	for (const elem in variables) {
		concatStr += `${variables[elem]} `;
	}
	return concatStr.trim();
}

// main function
module.exports = {
	name: 'uservar',
	description: 'edit user variable',
	usage: ' [username] [variable] example: !uservar admin this is the uservar',
	guildOnly: false,
	adminOnly: true,
	execute(message, args) {
		if (!args.length) return message.reply('Specify the username!');
		if (args.length < 2) return message.reply('Specify the variable!');
		const username = args[0];
		const variable = ConcatVar(args);
		API.editUserVariable(username, variable).then(res => {
			if (res) return message.channel.send(`${username}'s variable has been changed to \`${variable}\``);
		}).catch(err => {
			console.error(err);
			message.reply(err.message);
		});
	},
};