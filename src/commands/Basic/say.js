module.exports = {
    name: "say",
    description: "Make me say something",
    aliases: [],
    usage: "rin>say <text>",
    category: "Basic",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(!Arguments.length) return Message.channel.send({embed: {
            color: "RED",
            description: "Please give me the text"
        }});
        try {
            Message.delete()
        } catch (Err) {}
        return Message.channel.send(Arguments.join(" "), {attachment: Message.attachments.size > 0 ? Message.attachments.first().url : "", disableMentions: "all"})
    }
}