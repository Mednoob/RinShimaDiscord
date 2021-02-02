const Axios = require("axios")
const PrettyMs = require("pretty-ms")

module.exports = {
    name: "nhentai",
    description: "Gives you NHentai Doujin",
    aliases: ["nh"],
    usage: "rin>nhentai [Doujin ID]",
    category: "NSFW",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(!Message.channel.nsfw && Message.author.id != "366169273485361153") return Message.channel.send({embed: {
            color: "RED",
            description: "You can't use this command outside NSFW Channel!"
        }});
        let DoujinID = '';
        let MediaID = '';
        let PagesArray = [];
        let CoverObject = {};
        let Title = {};
        let Tags = [];
        let FavoriteAmount = 0;
        let UploadDate = 0;
        let DateNow = Date.now();
        let FrontMessage;
        if(!Arguments.length) {
            await Axios.default.get("https://nhentai.net/random").then(async x => {
                await Rin.NHentai.GetBook(x.request._redirectable._currentUrl.split("").filter(y => !isNaN(y)).join("")).then(async z => {
                    DoujinID = `${z.id}`
                    MediaID = z.media_id
                    Title = z.title
                    PagesArray = z.images.pages
                    CoverObject = z.images.cover
                    Tags = z.tags
                    FavoriteAmount = z.num_favorites
                    UploadDate = z.upload_date

                    FrontMessage = await Message.channel.send({embed: {
                        color: 0xec2854,
                        author: {
                            name: Message.author.tag,
                            iconURL: Message.author.displayAvatarURL({format: 'png', size: 2048, dynamic: true})
                        },
                        title: Title.pretty,
                        url: `https://nhentai.net/g/${DoujinID}`,
                        fields: [
                            {
                                name: "Language Tags",
                                value: Tags.filter(x => x.type == "language").length ? Tags.filter(x => x.type == "language").map(x => `\`${x.name}\``).join(", ") : "No Information",
                                inline: true
                            },
                            {
                                name: "Favorites",
                                value: FavoriteAmount.toString(),
                                inline: true
                            },
                            {
                                name: "Tags",
                                value: Tags.filter(x => x.type == "tags").length ? Tags.filter(x => x.type == "language").map(x => `\`${x.name}\``).join(", ") : "No Information",
                                inline: false
                            }
                        ],
                        image: {
                            url: Rin.NHentai.GetCoverURL(MediaID, CoverObject)
                        },
                        footer: {
                            text: "React with 📖 to read. (This prompt ends in 15 seconds)"
                        }
                    }})
                })
            })
        } else {
            if(isNaN(Arguments[0])) return Message.channel.send({embed: {
                color: "RED",
                description: "Invalid ID"
            }});
            try {
                await Rin.NHentai.GetBook(Arguments[0]).then(async x => {
                    DoujinID = `${x.id}`
                    MediaID = x.media_id
                    Title = x.title
                    PagesArray = x.images.pages
                    CoverObject = x.images.cover
                    Tags = x.tags
                    FavoriteAmount = x.num_favorites
                    UploadDate = x.upload_date

                    FrontMessage = await Message.channel.send({embed: {
                        color: 0xec2854,
                        author: {
                            name: Message.author.tag,
                            iconURL: Message.author.displayAvatarURL({format: 'png', size: 2048, dynamic: true})
                        },
                        title: Title.pretty,
                        url: `https://nhentai.net/g/${DoujinID}`,
                        fields: [
                            {
                                name: "Language Tags",
                                value: Tags.filter(x => x.type == "language").length ? Tags.filter(x => x.type == "language").map(x => `\`${x.name}\``).join(", ") : "No Information",
                                inline: true
                            },
                            {
                                name: "Favorites",
                                value: FavoriteAmount.toString(),
                                inline: true
                            },
                            {
                                name: "Tags",
                                value: Tags.filter(x => x.type == "tags").length ? Tags.filter(x => x.type == "language").map(x => `\`${x.name}\``).join(", ") : "No Information",
                                inline: false
                            }
                        ],
                        image: {
                            url: Rin.NHentai.GetCoverURL(MediaID, CoverObject)
                        },
                        footer: {
                            text: "React with 📖 to read. (This prompt ends in 15 seconds)"
                        }
                    }})
                })
            } catch (Err) {
                return Message.channel.send({embed: {
                    color: "RED",
                    description: "```" + Err + "```"
                }})
            }
        }
        await FrontMessage.react("📖")
        return setTimeout(async () => {
            const OldCollector = FrontMessage.createReactionCollector((Reaction, User) => User.id == Message.author.id, { time: 15000 })
        OldCollector.on("collect", (Reaction, User) => {
            if(Reaction.emoji.name.includes("📖")) {
                OldCollector.stop("Started Reading")
            }
        })
        OldCollector.on("end", (Collected, Reason) => {
            if(Reason == "Started Reading") {
                FrontMessage.delete()
                return InitializeReader(Rin, Message, DoujinID, MediaID, PagesArray, Title)
            } else {
                FrontMessage.reactions.cache.filter(x => x.me).forEach(x => x.remove())
                return FrontMessage.edit({embed: {
                    color: 0xec2854,
                    author: {
                        name: Message.author.tag,
                        iconURL: Message.author.displayAvatarURL({format: 'png', size: 2048, dynamic: true})
                    },
                    title: Title.pretty,
                    url: `https://nhentai.net/g/${DoujinID}`,
                    fields: [
                        {
                            name: "Language Tags",
                            value: Tags.filter(x => x.type == "language").length ? Tags.filter(x => x.type == "language").map(x => `\`${x.name}\``).join(", ") : "No Information",
                            inline: true
                        },
                        {
                            name: "Favorites",
                            value: FavoriteAmount.toString(),
                            inline: true
                        },
                        {
                            name: "Tags",
                            value: Tags.filter(x => x.type == "tags").length ? Tags.filter(x => x.type == "language").map(x => `\`${x.name}\``).join(", ") : "No Information",
                            inline: false
                        }
                    ],
                    image: {
                        url: Rin.NHentai.GetCoverURL(MediaID, CoverObject)
                    },
                    footer: {
                        text: "Reading Prompt Ended."
                    }
                }})
            }
        })
        }, 500)
    }
}

/**
 * Initializes NHentai Reader
 * @param {import("../../classes/RinClient")} Rin RinClient
 * @param {import("discord.js").Message} Message Message
 * @param {string | number} DoujinID NHentai Doujin ID
 * @param {string | number} MediaID NHentai Doujin Media ID
 * @param {Object[]} PagesArray Doujin Pages Array
 * @param {string} PagesArray.t Doujin Page Type
 * @param {number} PagesArray.w Doujin Page Width
 * @param {number} PagesArray.h Doujin Page Height
 * @param {Object} Title Doujin Title
 * @param {string} Title.english Doujin English Title
 * @param {string} Title.japanese Doujin Japanese Title
 * @param {string} Title.pretty Doujin Pretty Title
 */
async function InitializeReader(Rin, Message, DoujinID, MediaID, PagesArray, Title) {
    let current_page = 0;
    const Pages = Rin.NHentai.GetPagesURL(MediaID, PagesArray)
    let Embed = new (require("discord.js").MessageEmbed)()
    Embed.setTitle(Title.pretty)
    Embed.setURL(`https://nhentai.net/g/${DoujinID}`)
    Embed.setImage(Pages[current_page])
    Embed.setColor(0xec2854)
    Embed.setFooter(`Page ${current_page + 1} / ${Pages.length}`);
    const ReaderMessage = await Message.channel.send(Embed)
    await ReaderMessage.react("⬅️")
    await ReaderMessage.react("⏹️")
    await ReaderMessage.react("➡️")
    const ReaderCollector = ReaderMessage.createReactionCollector((Reaction, User) => User.id == Message.author.id, { time: 3600000 })
    ReaderCollector.on("collect", (Reaction, User) => {
        if(Reaction.emoji.name.includes("➡️")) {
            current_page = current_page + 1;
            if(current_page >= Pages.length) return ReaderCollector.stop("Done Reading");
            Embed.setImage(Pages[current_page]);
            Embed.setFooter(`Page ${current_page + 1} / ${Pages.length}`);
            return ReaderMessage.edit(Embed);
        } else if(Reaction.emoji.name.includes("⬅️")) {
            if(current_page == 0) return;
            current_page = current_page - 1;
            if(current_page < 0) {
                current_page = 0;
                return;
            }
            Embed.setImage(Pages[current_page]);
            Embed.setFooter(`Page ${current_page + 1} / ${Pages.length}`);
            return ReaderMessage.edit(Embed);
        } else if(Reaction.emoji.name.includes("⏹️")) {
            return ReaderCollector.stop("Stopped Reading");
        } else return;
    })
    ReaderCollector.on("end", (Collected, Reason) => {
        if(Reason == "Done Reading") {
            return ReaderMessage.edit({embed: {
                color: 0xec2854,
                title: Title.pretty,
                url: `https://nhentai.net/g/${DoujinID}`,
                description: "That was the last page of the Doujin. Thank you for using my NHentai Command."
            }});
        } else if(Reason == "Stopped Reading") {
            return ReaderMessage.edit({embed: {
                color: 0xec2854,
                title: Title.pretty,
                url: `https://nhentai.net/g/${DoujinID}`,
                description: "You stopped reading the Doujin. Thank you for using my NHentai Command."
            }});
        } else return ReaderMessage.edit({embed: {
            color: 0xec2854,
            title: Title.pretty,
            url: `https://nhentai.net/g/${DoujinID}`,
            description: "Reading session timed out Thank you for using my NHentai Command."
        }})
    })
}