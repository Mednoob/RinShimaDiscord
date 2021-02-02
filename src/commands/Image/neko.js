const { Entry } = require("../../classes/api/src/Nekos")
const NekoEntry = new Entry()

module.exports = {
    name: "neko",
    description: "Gives you random neko image",
    aliases: [],
    usage: "rin>neko",
    category: "Image",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        const Neko = await NekoEntry.Get.Neko();
        if(!Message.guild.me.hasPermission('SEND_MESSAGES') || !Message.channel.permissionsFor(Rin.user.id).has("SEND_MESSAGES")) return message.author.send({embed: {
            color: "GREEN",
            image: {
                url: Neko
            },
            title: "Neko Image",
            footer: {
                text: "Using Nekos.Life API • If you found any act related to sexualizing minors, please report it to discord or report it to our team."
            }
        }});
        return Message.channel.send({embed: {
            color: "GREEN",
            image: {
                url: Neko
            },
            title: "Neko Image",
            footer: {
                text: "Using Nekos.Life API • If you found any act related to sexualizing minors, please report it to discord or report it to our team."
            }
        }});
    }
}