const AzurAPI = require("@azurapi/azurapi")

module.exports = {
    name: "azurlaneship",
    description: "Show ship information from Azur Lane",
    aliases: ["als", "azurship"],
    usage: "rin>azurlaneship [Language]",
    category: "Infos",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(!Arguments.length) return Message.channel.send({embed: {
            color: "RED",
            description: "Please, give me the name of the ship"
        }});

        const Ship = AzurAPI.getShip(Arguments.join(" "))

        if(!Ship || Ship == undefined) return Message.channel.send({embed: {
            color: "RED",
            description: "That ship data could not be found"
        }});

        return Message.channel.send({embed: {
            color: "GREEN",
            title: Ship.names.en,
            description: `**Rarity:** ${Ship.stars.stars} (${Ship.rarity})
**Type:** ${Ship.hullType}
**Nationality:** ${Ship.nationality}
**Class:** ${Ship.class}
**Retrofitable:** ${Ship.retrofit == true ? "Yes" : "No"}`,
            thumbnail: {
                url: Ship.thumbnail
            },
            fields: [
                {
                    name: "Statistic",
                    value: `**Health:** ${Ship.stats.baseStats.health}
**Armor:** ${Ship.stats.baseStats.armor}
**Fire Power:** ${Ship.stats.baseStats.firepower}
**Accuracy:** ${Ship.stats.baseStats.accuracy}
**Luck:** ${Ship.stats.baseStats.luck}`
                }
            ],
            image: {
                url: Ship.skins[0].image
            }
        }})
    }
}