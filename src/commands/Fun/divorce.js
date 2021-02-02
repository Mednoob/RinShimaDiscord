module.exports = {
    name: "divorce",
    description: "Divorce the user you married with",
    aliases: [],
    usage: "rin>divorce",
    category: "Fun",
    cooldown: 10000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        const AuthorData = Rin.MarryData.get(Message.author.id)
        if(!AuthorData) return Message.channel.send({embed: {
            color: "RED",
            description: "You are not yet married"
        }});
        const MarryPartner = Rin.users.cache.get(AuthorData)
        const WaitMessage = await Message.channel.send({embed: {
            color: "BLUE",
            description: `**Are you sure you want to divorce ${MarryPartner.toString()}? You can always remarry using \`marry\` command**\nReact with ✔ to continue\nReact with ❌ to cancel`,
            footer: {
                text: "This reaction will end in 15 seconds..."
            }
        }})
        WaitMessage.react("✔")
        WaitMessage.react("❌")
        const Collector = WaitMessage.createReactionCollector((Reaction, User) => Message.author.id == User.id, { time: 15000 })
        let Res = "";
        Collector.on("collect", (Reaction, User) => {
            switch (Reaction.emoji.name) {
                case "✔":
                    Res = "continue"
                    Collector.stop("continue")
                    break;
                case "❌":
                    Res = "cancel"
                    Collector.stop("cancel")
                    break;
            }
        })
        Collector.on("end", (Collected, Reason) => {
            switch (Res) {
                case "continue":
                    Rin.MarryData.delete(Message.author.id)
                    Rin.MarryData.delete(MarryPartner.id)
                    WaitMessage.edit({embed: {
                        color: "BLACK",
                        description: "You divorced your marriage"
                    }});
                    return MarryPartner.send({embed: {
                        color: "BLACK",
                        description: `Your marriage partner, ${Message.author.toString()}, divorced your marriage`
                    }});
                    break;
                case "cancel":
                    return WaitMessage.edit({embed: {
                        color: "RED",
                        description: "Divorce canceled"
                    }});
                    break;
                case "":
                    return WaitMessage.edit({embed: {
                        color: "RED",
                        description: `Reaction timed out`
                    }});
            }
        })
    }
}