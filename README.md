# authgg discord bot
Fully featured auth.gg discord bot using my [authgg-admin-api wrapper](https://www.npmjs.com/package/authgg-admin-api)

## Requirements
1. Discord Bot Token
2. Auth.GG authorisation key
3. Node.js v12.0.0^

## Installation
1. rename example.config.json to config.json
2. put in discord bot token, auth.gg authorisation and replace admin discord ids with your own
3. invite bot with manage messages and send messages permission
4. then look through !help for more info


## Packages
1. authgg-admin-api
2. discord.js
3. eslint

## Quickstart

```
curl -L -O https://github.com/kenny019/authgg-discordbot/archive/master.zip
npm install
node index.js // i recommend installing pm2 to run your bot

default prefix is !
```

# Commands
### !users
Gets a list of all users. Usage: `!users`

### !license
Gets a list of all license. Usage: `!license`

### !delete
Delete a license or user. Usage: `!delete user admin` or `!delete license Q14HP-ZI4CT-8E65X-PLTK7-E1LLA`

### !lookup
Looksup a license or user. Usage: `!lookup user admin` or `!lookup license Q14HP-ZI4CT-8E65X-PLTK7-E1LLA`

### !generate
Generates license/s. Usage: `!generate [days] [amount] [level] [format?] [prefix?] [length?]` format, prefix and length are optional.
Auth.gg example: [https://setup.auth.gg/admin/licenses#generate-license](https://setup.auth.gg/admin/licenses#generate-license)
You cant set level to 0

### !userpass
Changes user's password. Usage: `!userpass admin password1`

### !reset
Reset user's HWID. Usage: `!reset admin`

### !uservar
Changes user's variable. Usage: `!uservar this is my new variable`

#
### auth.gg api documentation
[https://setup.auth.gg/](https://setup.auth.gg/)

### error/issues
either make issue on github or contact me on discord `kenny#0001`
