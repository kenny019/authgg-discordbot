'use strict';

// imports
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client({
	presence: {
		activity: { name: `for commands | ${config.prefix}help`, type: 'WATCHING' },
	},
});
client.commands = new Discord.Collection();

// functions
function ImportCommands() {
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.name, command);
	}
}

function VerifyConfig() {
	if (!config) throw Error('Config file not found');
	if (!config.token) throw Error('Bot token not found');
	if (!config.auth) throw Error('auth.gg token not found');
	if (!config.prefix) config.prefix = '!';
}

client.on('ready', () => {
	VerifyConfig();
	ImportCommands();
	console.log(`logged in as ${client.user.tag}`);
});

// message listener

client.on('message', async message => {
	const prefix = config.prefix;
	if (!message.content.startsWith(prefix));
	if (message.author === client.user || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName);

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('Command not available in DMs');
	}

	if (command.adminOnly) {
		const adminArray = config.admins;
		if (!adminArray.includes(message.author.id)) return message.reply('You don\'t have the permission to execute this command.');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		await command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply(`error trying to execute that command ${message.author}`);
	}

});

client.login(config.token);

// catch errors
client.on('error', console.error);
client.on('shardError', console.error);
client.on('warn', console.warn);

process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);
process.on('warning', console.warn);