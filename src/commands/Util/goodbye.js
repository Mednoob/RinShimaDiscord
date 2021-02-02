module.exports = {
    name: "goodbye",
    description: "Goodbye Message Module",
    aliases: ["gbye"],
    usage: "rin>goodbye",
    category: "Util",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        if(Message.channel.type == "dm") return Message.channel.send({embed: {
            color: "RED",
            description: "Goodbye message module is not able to be used from DM"
        }});
        if(!Message.member.hasPermission("MANAGE_GUILD")) return Message.channel.send({embed: {color: "RED", description: "You don't have `Manage Server` permission to do that"}});
        const Pref =  Rin.GuildPrefixes.get(Message.guild.id) ? Rin.GuildPrefixes.get(Message.guild.id) : Rin.DefaultPrefix
        if(!Arguments.length) return Message.channel.send({embed: {
            color: "GREEN",
            title: "Goodbye Message Module",
            description: `\`${Pref}goodbye <option>\``,
            fields: [
                {
                    name: "Options",
                    value: "`set <channel> <text>` - **Enable and set the guild goodbye message**\n`test` - **Test the goodbye message**\n`disable` - **Disable the guild goodbye message**",
                    inline: true
                }
            ]
        }})
        if(Arguments[0] == "set") {
            Arguments = Arguments.slice(1, Arguments.length + 1)
            if(!Arguments.length || Arguments[0] == "") {
                return Message.channel.send({embed: {
                    color: "GREEN",
                    title: "Setting Guild Goodbye Message",
                    description: Rin.GuildPrefixes.get(Message.guild.id) ? "`" + Rin.GuildPrefixes.get(Message.guild.id) + "setgoodbye <channel> <message with placeholders>`" : "`rin>setgoodbye <channel> <message with placeholders>`",
                    fields: [
                        {
                            name: "Placeholders",
                            value: `\`{user}\` User mention (useless for goodbyes). Result: ${Message.author.toString()}
    \`{server}\` Server name. Result: ${Message.guild.name}
    \`{tag}\` User tag. Result: ${Message.author.tag}
    \`{discrim}\`, \`{discriminator}\` User discriminator. Result: ${Message.author.discriminator}
    \`{username}\`, \`{usernomention}\`, \`{nomention}\` User username. Result: ${Message.author.username}
    \`{size}\`, \`{amount}\`, \`{members}\` Amount of server member after user left. Result: ${Message.guild.members.cache.size}`
                        }
                    ]
                }})
            } else {
                const GoodbyeChannelArgs = Message.mentions.channels.first() || Message.guild.channels.cache.get(Arguments[0]) || Message.guild.channels.cache.find(x => x.name.includes(Arguments[0]))
                if(!GoodbyeChannelArgs) return Message.channel.send({embed: {color: "RED", description: "Couldn't find the channel you're looking for"}});
                if(!Message.guild.channels.cache.has(GoodbyeChannelArgs.id)) return Message.channel.send({embed: {
                    color: "RED",
                    description: "Are you trying to set server goodbye message outside this server? Baaaaka!"
                }});
                if(GoodbyeChannelArgs.type == "voice") return Message.channel.send({embed: {
                    color: "RED",
                    description: "Are you trying to make me send goodbye messages to a voice channel? Baaaaka!"
                }});
                if(!GoodbyeChannelArgs.permissionsFor(Rin.user.id).has("SEND_MESSAGES") || !GoodbyeChannelArgs.permissionsFor(Rin.user.id).has("SEND_TTS_MESSAGES")) return Message.channel.send({embed:{
                    color: "RED",
                    description: "I don't have permission to send messages there"
                }});
                if(!Arguments[1]) return Message.channel.send({embed: {color: "RED", description: "Please, give me the message content"}})
                Rin.GuildGoodbyes.set(Message.guild.id, {channel: { id: GoodbyeChannelArgs.id }, message: {content: Arguments.slice(1, Arguments.length + 1).join(" ")}})
                return Message.channel.send({embed: {
                    color: "GREEN",
                    title: "Successfully set the guild goodbye",
                    fields: [
                        {
                            name: "Channel",
                            value: GoodbyeChannelArgs.toString(),
                            inline: true
                        },
                        {
                            name: "Message",
                            value: Rin.ReplacePlaceholder(Arguments.slice(1, Arguments.length + 1).join(" "), Message.member),
                            inline: false
                        }
                    ]
                }});
            }
        } else if(Arguments[0] == "test") {
            let GuildGoodbye = Rin.GuildGoodbyes.get(Message.guild.id)
            if(!GuildGoodbye) return Message.channel.send({embed: {
                color: "RED",
                description: "The goodbye message module on this server is not yet enabled. You can enable it by using the `set` option."
            }});
            Rin.emit("guildMemberRemove", Message.member)
            return Message.channel.send({embed: {
                color: "GREEN",
                description: `Done! See <#${GuildGoodbye.channel.id}>`
            }})
        } else if(Arguments[0] == "disable") {
            let GuildGoodbye = Rin.GuildGoodbyes.get(Message.guild.id)
            if(!GuildGoodbye) return Message.channel.send({embed: {
                color: "RED",
                description: "The goodbye message module on this server is already disabled"
            }});
            Rin.GuildGoodbyes.delete(Message.guild.id)
            return Message.channel.send({embed: {
                color: "GREEN",
                description: "Goodbye message module for this server is now disabled"
            }})
        } else return Message.channel.send({embed: {
            color: "RED",
            description: "Invalid option"
        }})
    }
}