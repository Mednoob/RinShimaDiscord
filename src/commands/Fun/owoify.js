module.exports = {
    name: "owoify",
    description: "OwOify texts",
    aliases: [],
    usage: "rin>owoify <text>",
    category: "Fun",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(!Arguments.length) return Message.channel.send({embed: {
            color :"RED",
            description: "Pwease, give me text to owoify"
        }});
        return Message.channel.send({embed: {
            color: "GREEN",
            description: Arguments.join(" ").replace(/[lr]/gi, "w")
        }});
    }
}