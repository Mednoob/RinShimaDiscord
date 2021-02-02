const DevList = ["366169273485361153", "543698101886779413"]
const AsciiTable = require("ascii-table")

module.exports = {
    name: "serverlist",
    description: "Shows bot server list",
    aliases: ["servlist"],
    usage: "rin>serverlist",
    category: "DevOnly",
    cooldown: 5000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(!DevList.includes(Message.author.id)) return Message.channel.send({embed: {
            color: "RED",
            description: "You're not my developer, Baaaaka!"
        }});
        const Table = new AsciiTable("Server list")
        Table.setHeading("Guild Name", "Member Count")
        Rin.guilds.cache.forEach(y => Table.addRow(y.name.length > 15 ? y.name.substr(0, 15) + "..." : y.name, `${y.memberCount}`))
        return Message.channel.send({embed:{
            color: "GREEN",
            description: "```" + Table.toString() + "```"
        }});
    }
}