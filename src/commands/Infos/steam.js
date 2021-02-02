const PrettyNum = require("pretty-num").default

module.exports = {
    name: "steam",
    description: "Retrieve steam game info",
    aliases: [],
    usage: "rin>steam <query>",
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
            description: "Please, give me the name if the game you want to search"
        }});
        const ApiSearch = await Rin.Util.REST(`https://store.steampowered.com/api/storesearch?cc=us&l=en&term=${Arguments.join("+")}`, "GET")
        if(!ApiSearch.items.length) return Message.channel.send({embed: {
            color: "RED",
            description: "Couldn't find any result"
        }});
        Rin.Util.REST(`https://store.steampowered.com/api/appdetails?appids=${ApiSearch.items[0].id}`).then(x => {
            const Result = x[ApiSearch.items[0].id.toString()].data
            let Current = Result.price_overview ? `${Result.price_overview.currency} ${PrettyNum(Result.price_overview.final / 100, { thousandsSeparator: "." })}` : "Free"
            let Original = Result.price_overview ? `${Result.price_overview.currency} ${PrettyNum(Result.price_overview.initial / 100, { thousandsSeparator: "." })}` : "Free"
            const Price = Current == Original ? Current : `~~${Original}~~ ${Current}`
            const Platforms = []
            if(Result.platforms) {
                if(Result.platforms.windows) Platforms.push("Windows")
                if(Result.platforms.mac) Platforms.push("Mac")
                if(Result.platforms.linux) Platforms.push("Linux")
            }
            return Message.channel.send({embed: {
                color: "GREEN",
                title: Result.name,
                url: `https://store.steampowered.com/app/${ApiSearch.items[0].id}`,
                fields: [
                    {
                        name: "Price",
                        value: Price,
                        inline: true
                    },
                    {
                        name: "Platforms",
                        value: Platforms.join(", "),
                        inline: true
                    },
                    {
                        name: "Categories",
                        value: Result.categories.map(x => `\`${x.description}\``).join(", "),
                        inline: true
                    },
                    {
                        name: "Developers",
                        value: Result.developers ? Result.developers.join(", ") || "???" : "???",
                        inline: false
                    },
                    {
                        name: "Release Date",
                        value: Result.release_date.coming_soon ? "Coming Soon" : Result.release_date.date,
                        inline: true
                    }
                ],
                image : {
                    url: Result.header_image
                }
            }})
        })
    }
}