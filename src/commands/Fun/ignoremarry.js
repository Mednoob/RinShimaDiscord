module.exports = {
    name: "ignoremarry",
    description: "Ignore all marry request",
    aliases: [],
    usage: "rin>ignoremarry",
    category: "Fun",
    cooldown: 5000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        const UserIgnore = Rin.MarryIgnores.get(Message.author.id)
        if(!UserIgnore || UserIgnore == undefined || UserIgnore == false) {
            Rin.MarryIgnores.set(Message.author.id, true)
            return Message.channel.send({embed: {
                color: "GREEN",
                description: "Marry Ignore is now turned on"
            }});
        } else if(UserIgnore == true) {
            Rin.MarryIgnores.delete(Message.author.id)
            return Message.channel.send({embed: {
                color: "GREEN",
                description: "Marry Ignore is now turned off"
            }})
        }
    }
}