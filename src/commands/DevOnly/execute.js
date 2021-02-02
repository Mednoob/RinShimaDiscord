const ChildProcess = require("child_process")

module.exports = {
    name: "execute",
    description: "Execute bash/cmd line",
    aliases: ["ex", "exec"],
    usage: "rin>execute <CommandLine>",
    category: "DevOnly",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(Message.author.id != "366169273485361153") return Message.channel.send({embed: {color: "RED", description: "**You're not my developer! Baaaka!**"}})
        if(!Arguments.length) {
            const Embed = {
                embed: {
                    color: "RED",
                    description: "Please, provide the command line to be executed"
                }
            }
            if(!Message.guild || Message.channel.type == "dm") return Message.channel.send(Embed);
            if(!Message.guild.me.hasPermission("SEND_MESSAGES") || !Message.channel.permissionsFor(Rin.user.id).has("SEND_MESSAGES")) return Message.author.send(Embed);
            return Message.channel.send(Embed)
        } else {
            ChildProcess.exec(Arguments.join(" "), async (Err, StdOut, StdErr) => {
                if(Err) {
                    const ErrEmbed = {
                        embed: {
                            color: "RED",
                            description: "```" + Err.stack + "```"
                        }
                    }
                    if(!Message.guild || Message.channel.type == "dm") return Message.channel.send(ErrEmbed);
                    if(!Message.guild.me.hasPermission("SEND_MESSAGES") || !Message.channel.permissionsFor(Rin.user.id).has("SEND_MESSAGES")) return Message.author.send(ErrEmbed);
                    return Message.channel.send(ErrEmbed)
                }
                const Embed = {
                    embed: {
                        color: "GREEN",
                        description: StdOut.toString().length > 2048 ? await Rin.hastebin(StdOut) : `\`\`\`${StdOut.toString()}\`\`\``
                    }
                }
                
                if(!Message.guild || Message.channel.type == "dm") return Message.channel.send(Embed);
                if(!Message.guild.me.hasPermission("SEND_MESSAGES") || !Message.channel.permissionsFor(Rin.user.id).has("SEND_MESSAGES")) return Message.author.send(Embed);
                return Message.channel.send(Embed)
            })
        }
    }
}