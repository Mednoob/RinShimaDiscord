module.exports = {
    name: "ismarried",
    description: "Check if someone is married or not",
    aliases: ["ismarry"],
    usage: "rin>ismarry <user>",
    category: "Infos",
    cooldown: 2000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        const ArgsUser = Message.mentions.users.first() || Rin.users.cache.get(Arguments[0])
        if(!ArgsUser) return Message.channel.send({embed: {
            color: "RED",
            description: "Please, give me the user to check"
        }});
        const UserMarryData = Rin.MarryData.get(ArgsUser.id)
        if(!UserMarryData || UserMarryData == undefined) return Message.channel.send({embed: {
            color: "GREEN",
            description: `${ArgsUser.toString()} is not yet married`
        }});
        return Message.channel.send({embed: {
            color: "GREEN",
            description: `${ArgsUser.toString()} is married with ${Rin.users.cache.get(UserMarryData).toString()}`
        }});
        
    }
}