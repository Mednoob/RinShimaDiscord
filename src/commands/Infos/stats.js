const PackageInfo = require("../../../package.json")
const OS = require("os")
const PrettyBytes = require("pretty-bytes")
const PrettyMs = require("pretty-ms")

module.exports = {
    name: "stats",
    description: "Show the bot statistic",
    aliases: [],
    usage: "rin>stats",
    category: "Infos",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(!Arguments.length) {
            Message.channel.send({embed: {
                color: "GREEN",
                title: `${Rin.user.tag} Statistic`,
                fields: [
                    {
                        name: "Bot",
                        value: `**Library/Wrapper:** Discord.Js v${PackageInfo.dependencies["discord.js"].split("^").join("")}
**Uptime:** ${PrettyMs(Rin.uptime, { verbose: true })}
**Websocket Ping:** ${Rin.ws.ping} ms
**Websocket Shards:** ${Rin.ws.shards.size} shards
**Guilds:** ${Rin.guilds.cache.size}
**Users:** ${Rin.users.cache.size}`,
                        inline: true
                    },
                    {
                        name: "System",
                        value: `**Node.Js:** ${process.version}
**System Uptime:** ${PrettyMs(OS.uptime() * 1000, { verbose: true })}
**Arch:** ${OS.arch()}
**Platform:** ${OS.platform()}
**CPU:** ${OS.cpus()[0].model}`,
                        inline: false
                    }
                ]
            }})
        }
    }
}