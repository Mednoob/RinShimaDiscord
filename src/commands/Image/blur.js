module.exports = {
    name: "blur",
    description: "Blur image from avatar or from message attachment",
    aliases: ["imageblur"],
    usage: "rin>blur [attachment/fileURL]",
    category: "Image",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        Message.channel.startTyping()
        if(!Arguments.length) {
            if(!Message.attachments.size) {
                try {
                    const jimp = await require("jimp").read(Message.author.displayAvatarURL({format: 'png', size: 2048})).then(async x => await x.blur(5).getBufferAsync("image/png"))

                    return Message.channel.send(new (require("discord.js").MessageAttachment)(jimp, "blur.png")).then(() => Message.channel.stopTyping(true))
                } catch (Err) {
                    return Message.channel.send({embed: {
                        color: "RED",
                        description: `An error occured\n\`\`\`${Err}\`\`\``
                    }}).then(() => Message.channel.stopTyping(true));
                }
            }

            try {
                const jimp = await require("jimp").read(Message.attachments.first().url).then(async x => await x.blur(5).getBufferAsync("image/png"))

                return Message.channel.send(new (require("discord.js").MessageAttachment)(jimp, "blur.png")).then(() => Message.channel.stopTyping(true))
            } catch (Err) {
                return Message.channel.send({embed: {
                    color: "RED",
                    description: `An error occured\n\`\`\`${Err}\`\`\``
                }}).then(() => Message.channel.stopTyping(true));
            }
        }

        if(Arguments[0].includes("://")) {
            try {
                const jimp = await require("jimp").read(Arguments[0]).then(async x => await x.blur(5).getBufferAsync("image/png"))

                return Message.channel.send(new (require("discord.js").MessageAttachment)(jimp, "blur.png")).then(() => Message.channel.stopTyping(true))
            } catch (Err) {
                return Message.channel.send({embed: {
                    color: "RED",
                    description: `An error occured\n\`\`\`${Err}\`\`\``
                }}).then(() => Message.channel.stopTyping(true));
            }
        }

        let ArgsUser = Message.mentions.users.first() || Rin.users.cache.get(Arguments[0]) || Message.guild.members.cache.find(x => x.user.username.toLowerCase().includes(Arguments.join(" ").toLowerCase())).user

        if(!ArgsUser) return Message.channel.send({embed: {
            color: "RED",
            description: "Couldn't find that user."
        }});

        try {
            const jimp = await require("jimp").read(ArgsUser.displayAvatarURL({format: 'png', size: 2048})).then(async x => await x.blur(5).getBufferAsync("image/png"))

            return Message.channel.send(new (require("discord.js").MessageAttachment)(jimp, "blur.png")).then(() => Message.channel.stopTyping(true))
        } catch (Err) {
            return Message.channel.send({embed: {
                color: "RED",
                description: `An error occured\n\`\`\`${Err}\`\`\``
            }}).then(() => Message.channel.stopTyping(true));
        }
    }
}