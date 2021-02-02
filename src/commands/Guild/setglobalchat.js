module.exports = {
    name: "setglobalchat",
    description: "Set the global chat channel",
    aliases: ["sgcc"],
    usage: "rin>setglobalchat <channel>",
    category: "Guild",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(Message.channel.type == "dm") return Message.channel.send({embed: {
            color: "RED",
            description: "Are you trying to set global chat channel from DM? Baaaaka!"
        }});
        if(!Message.member.hasPermission("MANAGE_GUILD")) return Message.channel.send({embed: {
            color: "RED",
            description: "You don't have `Manage Server` permission to do that"
        }});
        const ChannelArgs = Message.mentions.channels.first() || Message.guild.channels.cache.get(Arguments[0]) || Message.guild.channels.cache.find(x => x.name.includes(Arguments[0]))
        if(!ChannelArgs || !Message.guild.channels.cache.has(ChannelArgs.id)) return Message.channel.send({embed: {
            color: "RED",
            description: "Could not get that channel in this server"
        }});
        if(!ChannelArgs.permissionsFor(Rin.user.id).has("SEND_MESSAGES")) return Message.channel.send({embed: {
            color: "RED",
            description: "I don't have `Send Messages` permission in that channel"
        }});
        Rin.GlobalChatData.set(Message.guild.id, { GuildID: Message.guild.id, ChannelID: ChannelArgs.id, ChannelToString: ChannelArgs.toString() })
        return Message.channel.send({embed: {
            color: "GREEN",
            description: `Global chat channel for this server is set to ${ChannelArgs.toString()}`
        }})
    }
}