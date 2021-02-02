const sources = ["stable", "master", "rpc", "commando", "akairo", "akairo-master"]

module.exports = {
    name: "docs",
    description: "Search something on Discord.JS docs, Akairo docs, DJS-Commando docs, or DJS-RPC docs",
    aliases: ["djsdocs"],
    usage: "rin>docs <query> [docsName]",
    category: "Infos",
    cooldown: 2000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(!Arguments.length) return Message.channel.send({embed: {
            color: "RED",
            description: "Please, give me the query to search"
        }});
        let source = sources.includes(Arguments.slice(-1)[0]) ? Arguments.pop(): "stable"
        try {
            const embedJson = await Rin.Util.REST(`https://djsdocs.sorta.moe/v2/embed?src=${source}&q=${Arguments.join("+")}`)
            if(embedJson == null) return Message.channel.send({embed: {
                color: "RED",
                description: "No result found"
            }});

            return Message.channel.send({embed: embedJson})
        } catch(Err) {
            return Message.channel.send({embed: {
                color: "RED",
                description: `There was an error while trying to do the search\n\`\`\`${Err}\`\`\``
            }});
        }
    }
}