module.exports = {
    name: "customrespond",
    description: "Custom Respond Module",
    aliases: ["cr"],
    usage: "rin>customrespond",
    category: "Util",
    cooldown: 3000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]}
     */
    run: async (Rin, Message, Arguments) => {
        if(Message.channel.type == "dm") return Message.channel.send({embed: {
            color: "RED",
            description: "Custom respond module is not able to be used from DM"
        }});
        if(!Message.member.hasPermission("MANAGE_GUILD")) return Message.channel.send({embed: {color: "RED", description: "You don't have `Manage Server` permission to do that"}});
        const Pref =  Rin.GuildPrefixes.get(Message.guild.id) ? Rin.GuildPrefixes.get(Message.guild.id) : Rin.DefaultPrefix
        if(!Arguments.length) return Message.channel.send({embed: {
            color: "GREEN",
            title: "Custom Respond Module",
            description: `\`${Pref}customrespond <option>\``,
            fields: [
                {
                    name: "Options",
                    value: "`create <input> <output>` - **Create a new custom respond**\n`list` - **List of custom respond you created**\n`edit <id> <newInput> <newOutput>` - **Edit a specific custom respond**\n`delete <id>` - **Delete a specific custom respond**",
                    inline: true
                }
            ]
        }});
        if(Arguments[0] == "create") {
            Arguments = Arguments.slice(1, Arguments.length + 1)
            if(!Arguments.length) return Message.channel.send({embed: {
                color: "GREEN",
                title: "Create Custom Respond",
                description: Rin.GuildPrefixes.get(Message.guild.id) ? "`" + Rin.GuildPrefixes.get(Message.guild.id) + "createcustomrespond <input(using ASCII(Percent) Encoding)> <output/respond>`" : "`rin>createcustomrespond <input(using URL Encoding)> <output/respond>`",
                fields: [
                    {
                        name: "ASCII(Percent) Encoding",
                        value: `You can see URL Encodings [Here](https://www.w3schools.com/tags/ref_urlencode.ASP#:~:text=ASCII%20Encoding%20Reference)
     
**Example:** \`Hello,%20Everyone\`
**Result:** \`Hello, Everyone\``,
                         inline: true
                    }
                ]
             }});
             if(!Arguments[1]) return Message.channel.send({embed: {
                 color: "RED",
                 description: "Please, type the respond"
             }});
             const AsciiDecode = decodeURIComponent(Arguments[0])
             const Size = parseInt(Rin.CustomResponds.array()[0] ? Rin.CustomResponds.array()[0].Id : "0") + 1
             const Resp = Arguments.slice(1, Arguments.length + 1).join(" ")
             Rin.CustomResponds.set(`${Message.guild.id}_${Size}`, { Id: Size, GuildID: Message.guild.id, Input: AsciiDecode, Output: Resp })
             return Message.channel.send({embed: {
                 color: "GREEN",
                 title: "Successfully created custom respond",
                 fields: [
                     {
                         name: "ID",
                         value: `\`${Size}\``,
                         inline: true
                     },
                     {
                         name: "Input",
                         value: AsciiDecode,
                         inline: false
                     },
                     {
                         name: "Output/Respond",
                         value: Resp,
                         inline: false
                     }
                 ]
             }})
        } else if(Arguments[0] == "list") {
            const GuildRespondsFilter = Rin.CustomResponds.filter(x => x.GuildID == Message.guild.id)
            if(GuildRespondsFilter.size < 1) return Message.channel.send({embed: {
                color: "GREEN",
                title: `${Message.guild.name} Custom Respond List`,
                description: "This server has no custom respond. Try to create one using `createcustomrespond` command."
            }});
            return Message.channel.send({embed: {
                color: "GREEN",
                title: `${Message.guild.name} Custom Respond List`,
                fields: [
                    {
                        name: "ID | Input",
                        value: GuildRespondsFilter.map(x => `${x.Id} | ${x.Input}`).join("\n"),
                        inline: true
                    }
                ]
            }})
        } else if(Arguments[0] == "edit") {
            Arguments = Arguments.slice(1, Arguments.length + 1)
            if(!Arguments.length) return Message.channel.send({embed: {
                color: "GREEN",
                title: "Edit Custom Respond",
                description: Rin.GuildPrefixes.get(Message.guild.id) ? "`" + Rin.GuildPrefixes.get(Message.guild.id) + "editcustomrespond <custom respond id> <new input(using ASCII(Percent) Encoding)> <new output/respond>`" : "`rin>editcustomrespond <custom respond id> <new input(using ASCII(Percent) Encoding)> <new output/respond>`",
                fields: [
                    {
                        name: "ASCII(Percent) Encoding",
                        value: `You can see URL Encodings [Here](https://www.w3schools.com/tags/ref_urlencode.ASP#:~:text=ASCII%20Encoding%20Reference)
     
     **Example:** \`Hello,%20Everyone\`
     **Result:** \`Hello, Everyone\``,
                         inline: true
                    }
                ]
            }});
            if(!Arguments[1]) return Message.channel.send({embed: {
                color: "RED",
                description: "Please, type the new input"
            }});
            if(!Arguments[2]) return Message.channel.send({embed: {
                color: "RED",
                description: "Please, type the new output"
            }});
            if(isNaN(Arguments[0])) return Message.channel.send({embed: {
                color: "RED",
                description: "The ID must be a number"
            }});
            const RespondData = Rin.CustomResponds.get(`${Message.guild.id}_${Arguments[0]}`)
            if(!RespondData || RespondData == undefined) return Message.channel.send({embed: {
                color: "RED",
                description: "Custom respond with that ID couldn't be found",
                footer: {
                    text: "Use `listcustomrespond` to see the ID of a custom respond"
                }
            }});
            const NewInput = decodeURIComponent(Arguments[1])
            const NewOutput = Arguments.slice(2, Arguments.length + 1).join(" ")
            Rin.CustomResponds.set(`${Message.guild.id}_${Arguments[0]}`, { Id: Arguments[0], GuildID: Message.guild.id, Input: NewInput, Output: NewOutput });
            return Message.channel.send({embed: {
                color: "GREEN",
                title: "Successfully edited custom respond",
                fields: [
                    {
                        name: "ID",
                        value: `\`${Arguments[0]}\``,
                        inline: true
                    },
                    {
                        name: "New Input",
                        value: NewInput,
                        inline: false
                    },
                    {
                        name: "New Output",
                        value: NewOutput,
                        inline: true
                    }
                ]
            }})
        } else if(Arguments[0] == "delete") {
            Arguments = Arguments.slice(1, Arguments.length + 1)
            if(!Arguments.length || !Arguments[0]) return Message.channel.send({embed: {
                color: "RED",
                description: "Please, specify the ID of the custom respond that is going to be deleted"
            }});
            const DataFilter = Rin.CustomResponds.filter(x => x.GuildID == Message.guild.id && x.Id == Arguments[0])
            if(DataFilter.size < 1) return Message.channel.send({embed: {
                color: "RED",
                description: `Couldn't find custom respond with that ID in this server`
            }});
            Rin.CustomResponds.delete(`${Message.guild.id}_${Arguments[0]}`)
            return Message.channel.send({embed: {
                color: "GREEN",
                title: "Custom Respond Successfully Deleted",
                description: `Custom Respond with ID \`${Arguments[0]}\` successfully deleted`
            }})
        } else return Message.channel.send({embed: {
            color: "RED",
            description: "Invalid option"
        }})
    }
}