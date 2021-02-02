const { Entry } = require("../../classes/api/src/Lolis")
const LoliEntry = new Entry()

module.exports = {
    name: "loli",
    description: "Gives you random loli image",
    aliases: [],
    usage: "rin>loli",
    category: "Image",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        const Loli = await LoliEntry.Get.Random()
        if(!Message.guild.me.hasPermission("SEND_MESSAGES") || !Message.channel.permissionsFor(Rin.user.id).has("SEND_MESSAGES")) return Message.author.send({embed: {
            color: "GREEN",
            title: "Loli Image",
            description: `**Categories:** ${Loli.categories.map(x => `\`${x}\``).join(", ")}`,
            image: {
                url: Loli.url
            },
            footer: {
                text: "Using Lolis.Life API • If you found any act related to sexualizing minors, please report it to discord or report it to our team."
            }
        }});
        return Message.channel.send({embed: {
            color: "GREEN",
            title: "Loli Image",
            description: `**Categories:** ${Loli.categories.map(x => `\`${x}\``).join(", ")}`,
            image: {
                url: Loli.url
            },
            footer: {
                text: "Using Lolis.Life API • If you found any act related to sexualizing minors, please report it to discord or report it to our team."
            }
        }});
    }
}