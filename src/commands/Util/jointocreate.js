module.exports = {
    name: "jointocreate",
    description: "Join to Create Module",
    aliases: ["jtc"],
    usage: "rin>jtc",
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
            description: "Custom respond module is not able to be used from DM"
        }});
        if(!Message.member.hasPermission("MANAGE_CHANNELS")) return Message.channel.send({embed: {color: "RED", description: "You don't have `Manage Channels` permission to do that"}});
        const Pref =  Rin.GuildPrefixes.get(Message.guild.id) ? Rin.GuildPrefixes.get(Message.guild.id) : Rin.DefaultPrefix
        if(!Arguments.length) return Message.channel.send({embed: {
            color: "GREEN",
            title: "Join to Create Module",
            description: `\`${Pref}jointocreate <option>\``,
            fields: [
                {
                    name: "Options",
                    value: "`enable` - **Enable the Join to Create module**",
                    inline: true
                }
            ]
        }});
        if(Arguments[0] == "enable") {
            if(!Message.guild.me.hasPermission("MANAGE_CHANNELS")) return Message.channel.send({embed: {
                color: "RED",
                description: "I don't have `Manage Channels` permission to do that"
            }});
            const GuildJtcData = Rin.JtcData.get(Message.guild.id)
            if(GuildJtcData) return Message.channel.send({embed: {
                color: "RED",
                description: "Join to create is already created in this server"
            }});
            const WaitMessage = await Message.channel.send({embed: {
                color: "GREEN",
                description: "Creating Join to Create..."
            }})
            try {
                const JtcCategory = await Message.guild.channels.create("Join To Create", {
                    type: "category"
                })
                const JtcVoiceChannel = await Message.guild.channels.create("Join To Create", {
                    type: "voice",
                    parent: JtcCategory.id
                })
                Rin.JtcData.set(Message.guild.id, { GuildID: Message.guild.id, CategoryID: JtcCategory.id, VoiceChannelID: JtcVoiceChannel.id, AuthorID: Message.author.id })
                return WaitMessage.edit({embed: {
                    color: "GREEN",
                    description: "Join To Create created successfully!"
                }})
            } catch (Err) {
                return WaitMessage.edit({embed: {
                    color: "RED",
                    description: `There was an error when trying to create Join to Create\n\`\`\`${Err}\`\`\``
                }})
            }
        } else return Message.channel.send({embed: {
            color: "RED",
            description: "Invalid option"
        }})
    }
}