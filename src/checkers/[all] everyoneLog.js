/**
 * @param {import("../classes/RinClient")} Rin 
 * @param {import("discord.js").Message} Message 
 */
module.exports = async (Rin, Message) => {
    if(Message.content.includes("@everyone") || Message.content.includes("@here")) {
        const LogsData = Rin.EveryoneLogs.get(Message.guild.id)
        if(!LogsData) {

        } else {
            const LogsChannel = await Message.guild.channels.fetch(LogsData)
            LogsChannel.send({embed: {
                color: "ORANGE",
                title: "Someone mentioned everyone or here",
                fields: [
                    {
                        name: "Author",
                        value: Message.author.toString(),
                        inline: true
                    },
                    {
                        name: "Channel",
                        value: Message.channel.toString(),
                        inline: true
                    },
                    {
                        name: "Content",
                        value: Message.content,
                        inline: false
                    }
                ]
            }})
        }
    }
}