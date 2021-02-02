module.exports = {
    name: "spoilattachment",
    description: "Re-send attachment in your message as a spoiler attachment",
    aliases: ["spoilimage", "spoilattach", "spoilerimage", "spoilerattachment"],
    usage: "rin>spoilattachment",
    category: "Basic",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(!Message.attachments.size) return Message.channel.send({embed: {
            color: "RED",
            description: "Please, give me the attachment"
        }});

        try {
            const firstAttach = Message.attachments.first();
            const attachment = new (require("discord.js").MessageAttachment)(firstAttach.url, "SPOILER_." + firstAttach.url.slice((firstAttach.url.lastIndexOf(".") - 1 >>> 0) + 2))
            return Message.channel.send(attachment)
        } catch (Err) {
            return Message.channel.send({embed: {
                color: "RED",
                description: `An error occured\n\`\`\`${Err}\`\`\``
            }})
        }
    }
}