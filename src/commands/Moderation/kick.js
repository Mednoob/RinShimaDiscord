module.exports = {
    name: "kick",
    description: "Kick server member\nUse --silent at the end of the message if you don't want to send the reason to the person you kicked",
    aliases: [],
    usage: "rin>kick <member> [reason]",
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
            description: "Are you trying to kick guild member from DM? Baaaaka!"
        }});
        if(!Message.member.hasPermission("KICK_MEMBERS")) return Message.channel.send({embed: {
            color: "RED",
            description: "You don't have `Kick Members` permission to do that"
        }});
        if(!Message.guild.me.hasPermission("KICK_MEMBERS")) return Message.channel.send({embed: {
            color: "RED",
            description: "I don't have `Kick Members` permission to do that"
        }});

        if(!Arguments[0]) return Message.channel.send({embed: {
            color: "RED",
            description: "Please, give me the member to be kicked"
        }});
        
        const MentionedUser = Message.mentions.members.first() || Message.guild.members.cache.get(Arguments[0]) || Message.guild.members.cache.find(x => x.nickname.includes(Arguments[0])) || Message.guild.members.cache.find(x => x.user.username.includes(Arguments[0]))

        if(!MentionedUser) return Message.channel.send({embed: {
            color: "RED",
            description: "Couldn't find the member you're looking for"
        }});

        if(!MentionedUser.kickable) return Message.channel.send({embed: {
            color: "RED",
            description: "I can't kick this member"
        }});
        try {
        Arguments.slice(1, Arguments.length + 1).join(" ").endsWith("--silent") ? MentionedUser.kick(`Kicked by ${Message.author.tag} with reason: ${Arguments.slice(1, Arguments.length + 1).join(" ").split("--silent").join("") == "" ? "No reason was given" : Arguments.slice(1, Arguments.length + 1).join(" ").split("--silent").join("")}`).then(() => Message.channel.send({embed: {
            color: "GREEN",
            title: "Successfully kicked " + MentionedUser.user.tag,
            fields: [
                {
                    name: "Kicked by",
                    value: `${Message.author.tag}(${Message.author.id})`,
                    inline: true
                },
                {
                    name: "Silent",
                    value: `True`,
                    inline: true
                },
                {
                    name: "Reason",
                    value: Arguments.slice(1, Arguments.length + 1).join(" ").split("--silent").join("") == "" ? "No reason was given" : Arguments.slice(1, Arguments.length + 1).join(" ").split("--silent").join(""),
                    inline: false
                }
            ]
        }})) : MentionedUser.user.send({embed: {
            color: "RED",
            title: `You were kicked from ${Message.guild.name}`,
            description: `You were kicked from **${Message.guild.name}** by **${Message.author.tag}**`,
            fields: [
                {
                    name: "Reason",
                    value: Arguments[1] == "" ? "No Reason was given" : Arguments.slice(1, Arguments.length + 1).join(" "),
                    inline: false
                }
            ]
        }}).then(() => MentionedUser.kick(`Kicked by ${Message.author.tag} with reason: ${Arguments[1] == "" ? "No Reason was given" : Arguments.slice(1, Arguments.length + 1).join(" ")}`).then(() => Message.channel.send({embed: {
            color: "GREEN",
            title: "Successfully kicked " + MentionedUser.user.tag,
            fields: [
                {
                    name: "Kicked by",
                    value: `${Message.author.tag}(${Message.author.id})`,
                    inline: true
                },
                {
                    name: "Silent",
                    value: "False",
                    inline: true
                },
                {
                    name: "Reason",
                    value: Arguments[1] == "" ? "No Reason was given" : Arguments.slice(1, Arguments.length + 1).join(" "),
                    inline: false
                }
            ]
        }})))
        } catch (Err) {
            Message.channel.send({embed: {
                color: "RED",
                description: `There was an error when trying to kick the member\n\`\`\`${Err}\`\`\``
            }})
        }
    }
}