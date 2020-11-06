'use strict';

// imports
const config = require('../config.json');
const AuthGG = require('authgg-admin-api');
const API = new AuthGG.API(config.auth);
const Discord = require('discord.js');

// functions
function UserEmbed(data) {
	for (const value in data) {
		if (data[value] === '') data[value] = 'nil';
	}
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('Lookup Data')
		.setDescription(`Data for user: ${data.username}`)
		.addFields(
			{ name: 'Username: ', value: data.username, inline: true },
			{ name: 'Email: ', value: data.email, inline: true },
		)
		.addField('\u200B', '\u200B', true)
		.addFields(
			{ name: 'Rank: ', value: data.rank, inline: true },
			{ name: 'HWID: ', value: data.hwid, inline: true },
		)
		.addField('\u200B', '\u200B', true)
		.addFields(
			{ name: 'Variable: ', value: data.variable, inline: true },
			{ name: 'Last Login: ', value: data.lastlogin, inline: true },
		)
		.addField('\u200B', '\u200B', true)
		.addFields(
			{ name: 'Last IP: ', value: data.lastip, inline: true },
			{ name: 'License Expiry: ', value: data.expiry, inline: true },
		)
		.addField('\u200B', '\u200B', true)
		.setTimestamp()
		.setColor('#00ff3c');

	return dataEmbed;
}

function LicenseEmbed(data) {
	for (const value in data) {
		if (data[value] === '') data[value] = 'nil';
	}
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('Lookup Data')
		.setDescription(`Data for license: ${data.license}`)
		.addFields(
			{ name: 'License: ', value: data.license, inline: true },
			{ name: 'Rank: ', value: data.rank, inline: true },
		)
		.addField('\u200B', '\u200B', true)
		.addFields(
			{ name: 'Used: ', value: data.used, inline: true },
			{ name: 'Used By: ', value: data.used_by, inline: true },
		)
		.addField('\u200B', '\u200B', true)
		.addFields(
			{ name: 'Created: ', value: data.created, inline: true },
		)
		.addField('\u200B', '\u200B', true)
		.setTimestamp()
		.setColor('#00ff3c');

	return dataEmbed;
}

// main function
module.exports = {
	name: 'lookup',
	description: 'retrieve user/license data from auth.gg api',
	usage: ' [user/license] [input]',
	guildOnly: false,
	adminOnly: true,
	execute(message, args) {
		if (!args.length) return message.reply('Specify the user/license!');

		const selection = args[0];
		const input = args[1];

		switch (selection) {
		case 'user':
			API.getUserInfo(input).then(data => {
				const embedMsg = UserEmbed(data);
				message.channel.send(embedMsg);
			}).catch(err => {
				console.error(err);
				message.reply(err.message);
			});
			break;
		case 'license':
			API.getLicenseInfo(input).then(data => {
				console.log(data);
				const embedMsg = LicenseEmbed(data);
				message.channel.send(embedMsg);
			}).catch(err => {
				console.error(err);
				message.reply(err.message);
			});
			break;
		default:
			message.reply('Enter in user/license');
			break;
		}

	},
};