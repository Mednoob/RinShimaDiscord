module.exports = {
    name: "disclaimer",
    description: "Disclaimer",
    aliases: ["disclaim"],
    usage: "rin>disclaimer",
    category: "Infos",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        return Message.channel.send({embed: {
            color: "GREEN",
            title: "Disclaimer",
            description: "This bot project is not associated or partnered with the anime, Yuru Camp△ or even with the anime production company."
        }})
    }
}