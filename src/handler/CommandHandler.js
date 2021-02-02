const PrettyMs = require("pretty-ms")

/**
 * 
 * @param {import("../classes/RinClient")} Rin 
 * @param {import("discord.js").Message} Message 
 * @param {string} Prefix 
 */
module.exports = async (Rin, Message, Prefix) => {

    let Arguments = Message.content.slice(Prefix.length).trim().split(" ")
    const Command = Arguments.shift()

    const File = Rin.Commands.get(Command) || Rin.Aliases.get(Command)
    if(!File) return;

    const BanData = Rin.CommandBans.get(`${Message.author.id}_all`) || Rin.CommandBans.get(`${Message.author.id}_${File.name}`)
    if(BanData) {
        return Message.channel.send({embed:{
            color: "RED",
            title: "You're banned from using this command",
            fields: [
                {
                    name: "Reason",
                    value: BanData,
                    inline: true
                }
            ]
        }})
    }

    try{

        const AuthorCooldown = Rin.Cooldowns.get(`${Message.author.id}_${File.name}`)

        if(!AuthorCooldown || AuthorCooldown == undefined) {

            File.run(Rin, Message, Arguments)

        } else if(AuthorCooldown || AuthorCooldown != undefined) {
            if(Date.now() < AuthorCooldown) {
                return Message.channel.send({embed: {
                    color: "RED",
                    description: `You're on cooldown for \`${File.name}\` command. Please wait about ${PrettyMs(AuthorCooldown - Date.now(), { verbose: true })} before reusing the command`
                }})
            }
        }

    } catch (Err) {

        console.error(Err)

    } finally {

        const CommandLogString = `[Command] ${Command} => @${Message.author.tag}(${Message.author.id}), #${Message.channel.name}, ${Message.guild.name}`
        console.log(CommandLogString)
        Rin.channels.cache.get("741771573048115260").send(
            {
                embed: {
                    color: "GREEN", 
                    title: "[Command]", 
                    fields: [{
                        name: "Author",
                        value: `@${Message.author.tag}(${Message.author.id})`,
                        inline: true
                    }, {
                        name: "Channel",
                        value: `#${Message.channel.name}`,
                        inline: true
                    }, {
                        name: "Server",
                        value: `${Message.guild.name}`,
                        inline: false
                    }, {
                        name: "Log Input",
                        value: `\`${CommandLogString}\``
                    }]
                }
            })

            Rin.Cooldowns.set(`${Message.author.id}_${File.name}`, Date.now() + File.cooldown)

            setTimeout(() => {
                Rin.Cooldowns.delete(`${Message.author.id}_${File.name}`)
            }, File.cooldown)
    }

}