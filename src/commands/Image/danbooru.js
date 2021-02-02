module.exports = {
    name: "danbooru",
    description: "Gives you random danbooru image",
    aliases: ["dbooru"],
    usage: "rin>danbooru",
    category: "Image",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(!Arguments[0]) {
            let Dbooru;
            if(Message.channel.nsfw) {
                Dbooru = await Rin.Danbooru.Get.Random(true)
            } else {
                Dbooru = await Rin.Danbooru.Get.Random(false)
            }
        if(!Message.guild.me.hasPermission("SEND_MESSAGES") || !Message.channel.permissionsFor(Rin.user.id).has("SEND_MESSAGES")) return Message.author.send({embed: {
            color: "GREEN",
            title: "Danbooru Image",
            url: Dbooru[0].large_file_url,
            fields: [
                {
                    name: "Created at",
                    value: new Date(Dbooru[0].created_at).toUTCString(),
                    inline: true
                },
                {
                    name: "Tags",
                    value: Dbooru[0].tag_string.split(" ").map(x => `\`${x}\``).join(", ").length > 1050 ? "Too many tags to be loaded" : Dbooru[0].tag_string.split(" ").map(x => `\`${x}\``).join(", "),
                    inline: true
                },
            ],
            image: {
                url: Dbooru[0].large_file_url
            },
            footer: {
                text: "Using Danbooru API • If you found any act related to sexualizing minors, please report it to discord or report it to our team."
            }
        }});
        return Message.channel.send({embed: {
            color: "GREEN",
            title: "Danbooru Image",
            url: Dbooru[0].large_file_url,
            fields: [
                {
                    name: "Created at",
                    value: new Date(Dbooru[0].created_at).toUTCString(),
                    inline: true
                },
                {
                    name: "Tags",
                    value: Dbooru[0].tag_string.split(" ").map(x => `\`${x}\``).join(", ").length > 1050 ? "Too many tags to be loaded" : Dbooru[0].tag_string.split(" ").map(x => `\`${x}\``).join(", "),
                    inline: true
                },
            ],
            image: {
                url: Dbooru[0].large_file_url
            },
            footer: {
                text: "Using Danbooru API • If you found any act related to sexualizing minors, please report it to discord or report it to our team."
            }
        }});
        } else {
            let Dbooru;
            if(Message.channel.nsfw) {
                Dbooru = await Rin.Danbooru.Get.ByTag(Arguments, true)
            } else {
                Dbooru = await Rin.Danbooru.Get.ByTag(Arguments, false)
            }
            if(!Dbooru.length) return Message.channel.send({embed: {
                color: "RED",
                description: "No result found."
            }});
            if(!Message.guild.me.hasPermission("SEND_MESSAGES") || !Message.channel.permissionsFor(Rin.user.id).has("SEND_MESSAGES")) return Message.author.send({embed: {
                color: "GREEN",
                title: "Danbooru Image",
                url: Dbooru[0].large_file_url,
                fields: [
                    {
                        name: "Created at",
                        value: new Date(Dbooru[0].created_at).toUTCString(),
                        inline: true
                    },
                    {
                        name: "Tags",
                        value: Dbooru[0].tag_string.split(" ").map(x => `\`${x}\``).join(", ").length > 1050 ? "Too many tags to be loaded" : Dbooru[0].tag_string.split(" ").map(x => `\`${x}\``).join(", "),
                        inline: true
                    },
                ],
                image: {
                    url: Dbooru[0].large_file_url
                },
                footer: {
                    text: "Using Danbooru API • If you found any act related to sexualizing minors, please report it to discord or report it to our team."
                }
            }});
            return Message.channel.send({embed: {
                color: "GREEN",
                title: "Danbooru Image",
                url: Dbooru[0].large_file_url,
                fields: [
                    {
                        name: "Created at",
                        value: new Date(Dbooru[0].created_at).toUTCString(),
                        inline: true
                    },
                    {
                        name: "Tags",
                        value: Dbooru[0].tag_string.split(" ").map(x => `\`${x}\``).join(", ").length > 1024 ? "Too many tags to be loaded" : Dbooru[0].tag_string.split(" ").map(x => `\`${x}\``).join(", "),
                        inline: true
                    },
                ],
                image: {
                    url: Dbooru[0].large_file_url
                },
                footer: {
                    text: "Using Danbooru API • If you found any act related to sexualizing minors, please report it to discord or report it to our team."
                }
            }});
        }
    }
}