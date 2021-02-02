/**
 * @param {import("../classes/RinClient")} Rin 
 * @param {import("discord.js").Message} Message 
 */
module.exports = async (Rin, Message) => {
    if(Message.author.bot) return;
    for(const GlobalChat of Rin.GlobalChatData.array()) {
        if(Message.channel.id == GlobalChat.ChannelID) {
            Rin.GlobalChatData.filter(x => x.ChannelID != GlobalChat.ChannelID).forEach(async x => {
                const Ch = await Rin.channels.fetch(x.ChannelID)
                if(!Ch) await Ch.fetch(true)
                Ch.send({embed: {
                    author: {
                        name: Message.author.tag,
                        iconURL: Message.author.displayAvatarURL({format: "png", size: 2048, dynamic: true})
                    },
                    description: Message.content,
                    image: {
                        url: Message.attachments.size >= 1 ? Message.attachments.first().url : ""
                    }
                }})
            })
        }
    }
}