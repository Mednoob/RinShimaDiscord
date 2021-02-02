module.exports = {
    name: "ban",
    description: "Ban server member\nUse --silent at the end of the message if you don't want to send the reason to the person you banned",
    aliases: [],
    usage: "rin>ban <member> [reason]",
    category: "Moderation",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(Message.channel.type == "dm") return Message.channel.send({embed: {
            color: "RED",
            description: "Are you trying to ban guild member from DM? Baaaaka!"
        }});
        if(!Message.member.hasPermission("BAN_MEMBERS")) return Message.channel.send({embed: {
            color: "RED",
            description: "You don't have `Ban Members` permission to do that"
        }});
        if(!Message.guild.me.hasPermission("BAN_MEMBERS")) return Message.channel.send({embed: {
            color: "RED",
            description: "I don't have `Ban Members` permission to do that"
        }});

        if(!Arguments[0]) return Message.channel.send({embed: {
            color: "RED",
            description: "Please, give me the member to be banned"
        }});

        const MentionedUser = Message.mentions.members.first() || Message.guild.members.cache.get(Arguments[0]) || Message.guild.members.cache.find(x => x.nickname.includes(Arguments[0])) || Message.guild.members.cache.find(x => x.user.username.includes(Arguments[0]))

        if(!MentionedUser) return Message.channel.send({embed: {
            color: "RED",
            description: "Couldn't find the member you're looking for"
        }});

        if(!MentionedUser.bannable) return Message.channel.send({embed: {
            color: "RED",
            description: "I can't ban this member"
        }});
            if(Arguments.slice(1, Arguments.length + 1).join(" ").endsWith("--silent")) {
                MentionedUser.ban({ reason: `Banned by ${Message.author.tag} with reason: ${Arguments.slice(1, Arguments.length + 1).join(" ").split("--silent").join("") == "" ? "No reason was given" : Arguments.slice(1, Arguments.length + 1).join(" ").split("--silent").join("")}` }).then(() => Message.channel.send({embed: {
                    color: "GREEN",
                    title: "Successfully banned " + MentionedUser.user.tag,
                    fields: [
                        {
                            name: "Banned by",
                            value: `${Message.author.tag}(${Message.author.id})`,
                            inline: true
                        },
                        {
                            name: "Silent",
                            value: "`True`",
                            inline: true
                        },
                        {
                            name: "Reason",
                            value: Arguments.slice(1, Arguments.length + 1).join(" ").split("--silent").join("") == "" ? "No reason was given" : Arguments.slice(1, Arguments.length + 1).join(" ").split("--silent").join(""),
                            inline: false
                        }
                    ]
                }}))
            } else { 
            await MentionedUser.user.send({embed: {
                color: "GREEN",
                title: `You were banned from ${Message.guild.name}`,
                description: `You were banned from **${Message.guild.name}** by **${Message.author.tag}**`,
                fields: [
                    {
                        name: "Reason",
                        value: Arguments[1] == "" ? "No Reason was given" : Arguments.slice(1, Arguments.length + 1).join(" "),
                        inline: false
                    }
                ]
            }})
            MentionedUser.ban({ reason: `Banned by ${Message.author.tag} with reason: ${Arguments.slice(1, Arguments.length + 1).join(" ").split("--silent").join("") == "" ? "No reason was given" : Arguments.slice(1, Arguments.length + 1).join(" ").split("--silent").join("")}` }).then(() => Message.channel.send({embed: {
                color: "GREEN",
                title: "Successfully banned " + MentionedUser.user.tag,
                fields: [
                    {
                        name: "Banned by",
                        value: `${Message.author.tag}(${Message.author.id})`,
                        inline: true
                    },
                    {
                        name: "Silent",
                        value: "`True`",
                        inline: true
                    },
                    {
                        name: "Reason",
                        value: Arguments.slice(1, Arguments.length + 1).join(" ").split("--silent").join("") == "" ? "No reason was given" : Arguments.slice(1, Arguments.length + 1).join(" ").split("--silent").join(""),
                        inline: false
                    }
                ]
            }}))
        }
    }
}