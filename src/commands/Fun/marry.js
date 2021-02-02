module.exports = {
    name: "marry",
    description: "Marry someone",
    aliases: [],
    usage: "rin>marry <user>",
    category: "Fun",
    cooldown: 10000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        return Message.channel.send({embed: {
            color: "RED",
            description: "We're rewriting marry command. Sorry for the inconveniences"
        }})
        if(!Arguments.length) return Message.channel.send({embed: {
            color: "RED",
            description: "Please, mention someone you want to marry"
        }});
        const ArgsUser = Message.mentions.users.first() || Rin.users.cache.get(Arguments[0])
        if(!ArgsUser) return Message.channel.send({embed: {
            color: "RED",
            description: "Please, mention someone you want to marry"
        }});
        if(!Rin.users.cache.get(ArgsUser.id)) return Message.channel.send({embed: {
            color: "RED",
            description: "Couldn't get the user you mentioned. Are you trying to marry someone that is not in the same guild as me?"
        }});
        if(Message.author.id == ArgsUser.id) return Message.channel.send({embed: {
            color: "RED",
            description: "You can't marry yourself"
        }});
        if(ArgsUser.id == Rin.user.id) return Message.channel.send({embed: {
            color: "RED",
            description: "You want to marry me? I'm sorry, I have someone that I like."
        }});
        const MarryData = Rin.MarryData.get(Message.author.id)
        if(!MarryData || MarryData == undefined) {
            const UserMarryData = Rin.MarryData.get(ArgsUser.id)
            if(!UserMarryData || UserMarryData == undefined) {
                let DMMessage;
                const WaitDMMessage = await Message.channel.send({embed: {
                    color: "GREEN",
                    description: "Please wait, I'm trying to DM the user you want to marry with...",
                    
                }})
                const MarryIgnore = Rin.MarryIgnores.get(ArgsUser.id)
                if(MarryIgnore && MarryIgnore == true) return setTimeout(() => {
                    WaitDMMessage.edit({embed: {
                        color: "BLACK",
                        description: `Your marriage request ignored by the user`
                    }})
                }, 15000);
                try {
                DMMessage = await ArgsUser.send({embed: {
                    color: "PINK",
                    title: "Someone wants to marry with you!",
                    description: `**${Message.author.toString()} wanted to marry with you.**\nReact with ♥ to accept.\nReact with ❌ to decline.`,
                    footer: {
                        text: "This reaction will end in 15 seconds... • Use `ignoremarry` command if you want to ignore all marry request next time"
                    }
                }})
                WaitDMMessage.edit({embed: {
                    color: "GREEN",
                    title: "Successfully DM",
                    description: `Successfully DM the user you want to marry with. Waiting for the user acceptance...`,
                    footer: {
                        text: "This message will automatically edited when the user accept or decline"
                    }
                }})
                } catch (Err) {
                    return WaitDMMessage.edit({embed: {
                        color: "RED",
                        description: `Failed to DM\n\`\`\`${Err}\`\`\``
                    }})
                } 
                DMMessage.react("♥")
                DMMessage.react("❌")
                const Collector = DMMessage.createReactionCollector((Reaction, User) => User.id === ArgsUser.id, { time: 15000 })
                let Res = "";
                Collector.on("collect", (Reaction, Reactor) => {
                    switch (Reaction.emoji.name) {
                        case "❌":
                            Res = "decline"
                            Collector.stop("declined")
                            break;
                        case "♥":
                            Res = "accept"
                            Collector.stop("accepted")
                            break;
                    }
                })
                Collector.on("end", (Collected, Reason) => {
                    switch (Res) {
                        case "decline":
                            DMMessage.reactions.cache.filter(x => x.me).forEach(y => y.remove())
                            DMMessage.edit({embed: {
                                color: "BLACK",
                                description: `You declined ${Message.author.toString()} marriage request`,
                                footer: {
                                    text: "Use `ignoremarry` command if you want to ignore all marry request next time"
                                }
                            }});
                            return WaitDMMessage.edit({embed: {
                                color: "BLACK",
                                description: `Your marriage request has been declined`
                            }});
                            break;
                        case "accept":
                            Rin.MarryData.set(Message.author.id, ArgsUser.id)
                            Rin.MarryData.set(ArgsUser.id, Message.author.id)
                            DMMessage.reactions.cache.filter(x => x.me).forEach(y => y.remove())
                            DMMessage.edit({embed: {
                                color: "GREEN",
                                description: `You accepted ${Message.author.toString()} marriage request`,
                            }});
                            return WaitDMMessage.edit({embed: {
                                color: "GREEN",
                                description: `Your marriage request has been accepted. Congratulation.`
                            }});
                            break;
                    }
                    DMMessage.reactions.cache.filter(x => x.me).forEach(y => y.remove())
                    DMMessage.edit({embed: {
                        color: "BLACK",
                        description: `You ignored ${Message.author.toString()} marriage request`
                    }});
                    return WaitDMMessage.edit({embed: {
                        color: "BLACK",
                        description: `Your marriage request ignored by the user`
                    }});
                })
            } else {
                return Message.channel.send({embed: {
                    color: "RED",
                    description: "The user you want to marry already married with someone"
                }})
            }
        } else {
            if(MarryData == ArgsUser.id) return Message.channel.send({embed: {
                color: "RED",
                description: "You already married with this user"
            }});
            return Message.channel.send({embed: {
                color: "RED",
                description: "You already married with someone"
            }});
        }
    }
}