module.exports = {
    name: "welcome",
    description: "Welcome Message Module",
    aliases: ["welc"],
    usage: "rin>welcome",
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
            description: "Welcome message module is not able to be used from DM"
        }});
        if(!Message.member.hasPermission("MANAGE_GUILD")) return Message.channel.send({embed: {color: "RED", description: "You don't have `Manage Server` permission to do that"}});
        const Pref =  Rin.GuildPrefixes.get(Message.guild.id) ? Rin.GuildPrefixes.get(Message.guild.id) : Rin.DefaultPrefix
        if(!Arguments.length) return Message.channel.send({embed: {
            color: "GREEN",
            title: "Welcome Message Module",
            description: `\`${Pref}welcome <option>\``,
            fields: [
                {
                    name: "Options",
                    value: "`set <channel> <text>` - **Enable and set the guild welcome message**\n`test` - **Test the welcome message**\n`disable` - **Disable the guild welcome message**",
                    inline: true
                }
            ]
        }})
        if(Arguments[0].toLowerCase() == "set") {
            Arguments = Arguments.slice(1, Arguments.length + 1)
            if(!Arguments.length || Arguments[0] == "") {
                return Message.channel.send({embed: 
                    {
                        color: "GREEN", 
                        title: `Setting Guild Welcome Message`, 
                        description: Rin.GuildPrefixes.get(Message.guild.id) ? "`" + Rin.GuildPrefixes.get(Message.guild.id) + "welcome set <channel> <message with placeholders>`" : "`rin>welcome set <channel> <message with placeholders>`",
                        fields: [
                            {
                                name: "Placeholders", 
                                value: `\`{user}\` User mention. Result: ${Message.author.toString()}
\`{server}\` Server name. Result: ${Message.guild.name}
\`{tag}\` User tag. Result: ${Message.author.tag}
\`{discrim}\`, \`{discriminator}\` User discriminator. Result: ${Message.author.discriminator}
\`{username}\`, \`{usernomention}\`, \`{nomention}\` User username. Result: ${Message.author.username}
\`{size}\`, \`{amount}\`, \`{members}\` Amount of server member after user joined. Result: ${Message.guild.members.cache.size}`, 
                                inline: true
                            } 
                        ]
                    }
                });
            } else {
                const WelcomeChannelArgs = Message.mentions.channels.first() || Message.guild.channels.cache.get(Arguments[0]) || Message.guild.channels.cache.find(x => x.name.includes(Arguments[0]))
                if(!WelcomeChannelArgs) return Message.channel.send({embed: {color: "RED", description: "Couldn't find the channel you're looking for"}});
                if(!Message.guild.channels.cache.has(WelcomeChannelArgs.id)) return Message.channel.send({embed: {
                    color: "RED",
                    description: "Are you trying to set server welcome message outside this server? Baaaaka!"
                }});
                if(WelcomeChannelArgs.type == "voice") return Message.channel.send({embed: {
                    color: "RED",
                    description: "Are you trying to make me send welcome messages to a voice channel? Baaaaka!"
                }});
                if(!WelcomeChannelArgs.permissionsFor(Rin.user.id).has("SEND_MESSAGES") || !WelcomeChannelArgs.permissionsFor(Rin.user.id).has("SEND_TTS_MESSAGES")) return Message.channel.send({embed:{
                    color: "RED",
                    description: "I don't have permission to send messages there"
                }});
                if(!Arguments[1]) return Message.channel.send({embed: {color: "RED", description: "Please, give me the message content"}})
                Rin.GuildWelcomes.set(Message.guild.id, {channel:{ id: WelcomeChannelArgs.id }, message: {content: Arguments.slice(1, Arguments.length + 1).join(" ")}})
                return Message.channel.send({embed: {
                    color: "GREEN",
                    title: `Successfully set the guild welcome`,
                    fields: [
                        {
                            name: "Channel",
                            value: WelcomeChannelArgs.toString(),
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
            let GuildWelcome = Rin.GuildWelcomes.get(Message.guild.id)
            if(!GuildWelcome) return Message.channel.send({embed: {
                color: "RED",
                description: "The welcome message module on this server is not yet enabled. You can enable it by using the `set` option."
            }});
            Rin.emit("guildMemberAdd", Message.member)
            return Message.channel.send({embed: {
                color: "GREEN",
                description: `Done! See <#${GuildWelcome.channel.id}>`
            }});
        } else if(Arguments[0] == "disable") {
            let GuildWelcome = Rin.GuildWelcomes.get(Message.guild.id)
            if(!GuildWelcome) return Message.channel.send({embed: {
                color: "RED",
                description: "The welcome message module on this server is already disabled"
            }});
            Rin.GuildWelcomes.delete(Message.guild.id)
            return Message.channel.send({embed: {
                color: "GREEN",
                description: "Welcome message module for this server is now disabled"
            }})
        } else return Message.channel.send({embed: {
            color: "RED",
            description: "Invalid option"
        }})
    }
}