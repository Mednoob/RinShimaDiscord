module.exports = {
    name: "afk",
    description: "AFK Command",
    aliases: ["awayfromkeyboard"],
    usage: "rin>afk <reason>",
    category: "Guild",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        const AfkData = Rin.AfkData.get(`${Message.guild.id}_${Message.author.id}`)
        if(AfkData) return Message.channel.send({embed: {
            color: "RED",
            description: "You're already AFK"
        }});
        const Reas = Arguments.length > 0 ? Arguments.join(" ") : "No reason was given"
        const Attach = Message.attachments.filter(u => u.url.endsWith(".png") || u.url.endsWith(".jpg") || u.url.endsWith(".jpeg") || u.url.endsWith(".gif"))
        Rin.AfkData.set(`${Message.guild.id}_${Message.author.id}`, { AuthorID: Message.author.id, AuthorString: Message.author.toString(), GuildID: Message.guild.id, Reason: Reas, Attachment: Attach.size > 0 ? Attach.first().url : ""})
        return Message.channel.send({embed:{
            color: "GREEN",
            description: "Successfully set your AFK",
            footer: {
                text: "Put --pass at the end of your message if you want to send message without ending your afk session"
            },
            fields: [
                {
                    name: "Reason",
                    value: Reas,
                    inline: true
                }
            ],
            thumbnail: {
                url: Message.author.displayAvatarURL({format: "png", size: 2048, dynamic: true})
            }
        }})
    }
}