module.exports = {
    name: "github",
    description: "Retrieve github user stats",
    aliases: [],
    usage: "rin>github <username>",
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
            description: 'Please, give me the username to search'
        }});
        const ApiSearch = await Rin.Util.REST(`https://api.github.com/search/users?q=${Arguments.join("%20")}`, "GET")
        if(!ApiSearch.items.length) return Message.channel.send({embed: {
            color: "RED",
            desription: "Couldn't find any result"
        }});
        Rin.Util.REST(`https://api.github.com/users/${ApiSearch.items[0].login}`, "GET").then(Result => {
            Message.channel.send({embed: {
                color: "GREEN",
                title: `${Result.login}(${Result.id}) Stats`,
                url: Result.html_url,
                description: `**Created At:** ${new Date(Result.created_at).toUTCString()}
**Account Type:** ${Result.type}
**Followers:** ${Result.followers}
**Following:** ${Result.following}`,
                thumbnail: {
                    url: Result.avatar_url
                }
            }})
        })
    }
}