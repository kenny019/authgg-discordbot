'use strict';

// imports
const config = require('../config.json');
const AuthGG = require('authgg-admin-api');
const API = new AuthGG.API(config.auth);
const Discord = require('discord.js');

// functions
function CreateLicenseArray(data) {
	const tempArray = [];
	let licenseObj = {};
	for (const value in data) {
		licenseObj = {
			token: data[value].token,
			days: data[value].days,
		};
		tempArray.push(licenseObj);
	}
	return tempArray;
}

function GenerateEmbed(data, index) {
	const current = data.slice(index, index + 5);
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('List of License')
		.setTimestamp()
		.setColor('#00ff3c')
		.setDescription(`Displaying ${index + 1}-${index + current.length} out of ${data.length} licenses`);
	current.forEach(arr => dataEmbed.addFields(
		{ name: 'License: ', value: arr.token, inline: true },
		{ name: 'Days: ', value: arr.days, inline: true },
		{ name: '\u200B', value: '\u200B', inline: true },
	));
	return dataEmbed;
}

// main function
module.exports = {
	name: 'license',
	description: 'retrieve list of all license from auth.gg api',
	usage: '',
	guildOnly: false,
	adminOnly: true,
	execute(message) {
		API.getAllLicense().then(data => {
			console.log(data);
			const licenseArray = CreateLicenseArray(data);
			message.channel.send(GenerateEmbed(licenseArray, 0)).then(msg => {
				if (licenseArray.length <= 5) return;
				msg.react('➡️');
				const reactCollector = msg.createReactionCollector(
					(reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id,
					{ time: 60000 }, // timeout
				);
				let curIndex = 0;
				reactCollector.on('collect', reaction => {
					msg.reactions.removeAll().then(async () => {
						reaction.emoji.name === '⬅️' ? curIndex -= 5 : curIndex += 5;
						msg.edit(GenerateEmbed(licenseArray, curIndex));
						if (curIndex !== 0) await msg.react('⬅️');
						if (curIndex + 5 < licenseArray.length) msg.react('➡️');
					});
				});
			});
		}).catch(err => {
			console.error(err);
			message.reply(err);
		});
	},
};