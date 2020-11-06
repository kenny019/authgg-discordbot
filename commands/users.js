'use strict';

// imports
const config = require('../config.json');
const AuthGG = require('authgg-admin-api');
const API = new AuthGG.API(config.auth);
const Discord = require('discord.js');

// functions
function CreateUserArray(data) {
	const tempArray = [];
	for (const value in data) {
		tempArray.push(data[value].username);
	}
	return tempArray;
}

function GenerateEmbed(data, index) {
	const current = data.slice(index, index + 5);
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('List of Users')
		.setTimestamp()
		.setColor('#00ff3c')
		.setDescription(`Displaying ${index + 1}-${index + current.length} out of ${data.length} users`);
	current.forEach(user => dataEmbed.addField('Username: ', user));
	return dataEmbed;
}

// main function
module.exports = {
	name: 'users',
	description: 'retrieve list of all users from auth.gg api',
	usage: ' ',
	guildOnly: false,
	adminOnly: true,
	execute(message) {
		API.getAllUsers().then(data => {
			const userArray = CreateUserArray(data);
			message.channel.send(GenerateEmbed(userArray, 0)).then(msg => {
				if (userArray.length <= 5) return;
				msg.react('➡️');
				const reactCollector = msg.createReactionCollector(
					(reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id,
					{ time: 60000 }, // timeout
				);
				let curIndex = 0;
				reactCollector.on('collect', reaction => {
					msg.reactions.removeAll().then(async () => {
						reaction.emoji.name === '⬅️' ? curIndex -= 5 : curIndex += 5;
						msg.edit(GenerateEmbed(userArray, curIndex));
						if (curIndex !== 0) await msg.react('⬅️');
						if (curIndex + 5 < userArray.length) msg.react('➡️');
					});
				});
			});
		}).catch(err => {
			console.error(err);
			message.reply(err);
		});
	},
};