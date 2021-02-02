module.exports = {
    name: "rule34",
    description: "Search rule34 image",
    aliases: ["r34"],
    usage: "rin>rule34 [tags]",
    category: "NSFW",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(!Message.channel.nsfw) return Message.channel.send({embed: {
            color: "RED",
            description: "You can't use this command outside NSFW Channel!"
        }})
        let PostsGet;

        if(!Arguments.length) PostsGet = await Rin.Rule34.RandomAll()
        else PostsGet = await Rin.Rule34.Search(Arguments)
        const RandomPost = PostsGet[Math.floor(Math.random() * PostsGet.length)]
        const tags = RandomPost.tags.join(", ")
        return Message.channel.send({embed: {
            color: "GREEN",
            title: "Rule34 Image",
            url: RandomPost.file_url,
            fields: [
                {
                    name: "Tags",
                    value: tags.length > 1050 ? "Too many tags to be loaded" : tags,
                    inline: true
                }
            ],
            image: {
                url: RandomPost.file_url
            }
        }})
    }
}