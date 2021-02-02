module.exports = {
    name: "everyonelogs",
    description: "Everyone Logs Module",
    aliases: ["evlogs", "evlog", "everyonelog", "herelog", "herelogs"],
    usage: "rin>everyonelogs",
    category: "Util",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(Message.channel.type == "dm") return Message.channel.send({embed: {
            color: "RED",
            description: "Everyone logs module is not able to be used from DM"
        }});
        if(!Message.member.hasPermission("MANAGE_MESSAGES")) return Message.channel.send({embed: {color: "RED", description: "You don't have `Manage Messages` permission to do that"}});
        const Pref =  Rin.GuildPrefixes.get(Message.guild.id) ? Rin.GuildPrefixes.get(Message.guild.id) : Rin.DefaultPrefix
        if(!Arguments.length) return Message.channel.send({embed: {
            color: "GREEN",
            title: "Everyone Logs Module",
            description: `\`${Pref}everyonelogs <option>\``,
            fields: [
                {
                    name: "Options",
                    value: "`set <channel>` - **Enable and set the everyone logs channel**\n`disable` - **Disable the everyone logs**",
                    inline: true
                }
            ]
        }})
        if(Arguments[0] == "set") {
            Arguments = Arguments.slice(1, Arguments.length + 1)
            if(!Arguments[0] || !Arguments.length) return Message.channel.send({embed: {
                color: "RED",
                description: "Please, give me the channel"
            }});
            const ArgsChannel = Message.mentions.channels.first() || Message.guild.channels.cache.get(Arguments[0]) || Message.guild.channels.cache.find(x => x.name.includes(Arguments[0]))
            if(!ArgsChannel) return Message.channel.send({embed: {
                color: "RED",
                description: "Could'nt find the channel you're looking for"
            }})
            if(!Message.guild.channels.cache.has(ArgsChannel.id)) return Message.channel.send({embed: {
                color: "RED",
                description: "Are you trying to set everyone logs outside this server? Baaaaka!"
            }});
            if(ArgsChannel.type == "voice") return Message.channel.send({embed: {
                color: "RED",
                description: "Are you trying to make me send everyone logs to a voice channel? Baaaaka!"
            }});
            if(!ArgsChannel.permissionsFor(Rin.user.id).has("SEND_MESSAGES") || !ArgsChannel.permissionsFor(Rin.user.id).has("SEND_TTS_MESSAGES")) return Message.channel.send({embed:{
                color: "RED",
                description: "I don't have permission to send messages there"
            }});
            Rin.EveryoneLogs.set(Message.guild.id, ArgsChannel.id)
            return Message.channel.send({embed: {
                color: "GREEN",
                description: `Everyone Logs will be sent to ${ArgsChannel.toString()}`
            }});
        } else if(Arguments[0] == "disable") {
            Rin.EveryoneLogs.delete(Message.guild.id)
            return Message.channel.send({embed: {
                color: "GREEN",
                description: "Everyone Logs for this server has been disabled"
            }})
        } else return Message.channel.send({embed: {
            color: "RED",
            description: "Invalid option"
        }})
    }
}