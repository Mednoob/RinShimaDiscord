const WhiteList = ["366169273485361153", "747780362700324926", "543698101886779413"]

module.exports = {
    name: "commandban",
    description: "Ban someone from using command",
    aliases: [],
    usage: "rin>commandban <user> <cmd> <reason>",
    category: "DevOnly",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(!WhiteList.includes(Message.author.id)) return Message.channel.send({embed: {
            color: "RED",
            description: "**You're not my developer! Baaaka!**"
        }});
        if(!Arguments[0]) return Message.channel.send({embed: {
            color: "RED",
            description: "Please, give me the user to ban"
        }});
        const ArgsUser = Message.mentions.users.first() || Rin.users.cache.get(Arguments[0])
        if(!Arguments[1]) return Message.channel.send({embed: {
            color: "RED",
            description: "Please, give me the name of the command"
        }});
        Rin.CommandBans.set(`${ArgsUser.id}_${Arguments[1]}`, Arguments.slice(2, Arguments.length + 1).join(" "))
        return Message.channel.send({embed: {
            color: "GREEN",
            description: `Banned ${ArgsUser.toString()} from using ${Arguments[1]} command`
        }});
    }
}