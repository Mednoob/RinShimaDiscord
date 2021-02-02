/**
 * 
 * @param {import("../classes/RinClient")} Rin 
 * @param {import("discord.js").DMChannel | import("discord.js").GuildChannel} Channel 
 */
module.exports = async (Rin, Channel) => {
    Rin.JtcData.forEach(x => {
        if(Channel.id == x.VoiceChannelID || Channel.id == x.CategoryID) {
            if(Rin.channels.cache.get(Rin.JtcData.get(Channel.guild.id).VoiceChannelID)) {
                Rin.channels.cache.get(Rin.JtcData.get(Channel.guild.id).VoiceChannelID).delete()
            } else if(Rin.channels.cache.get(Rin.JtcData.get(Channel.guild.id).CategoryID)) {
                Rin.channels.cache.get(Rin.JtcData.get(Channel.guild.id).CategoryID).delete()
            }
            Rin.JtcData.delete(Channel.guild.id)
            Rin.OnGoingJtcData.filter(x => x.GuildID == Channel.guild.id).forEach(x => {
                Rin.channels.cache.get(x.VoiceChannelID).delete()
                Rin.OnGoingJtcData.delete(Rin.OnGoingJtcData.findKey(y => y == x))
            })
            return Channel.guild.owner.user.send({embed: {
                color: "RED",
                title: `Join to Create on ${Channel.guild.name} is now disabled`,
                description: `Join to Create on ${Channel.guild.name} is now disabled because the voice channel or the category used for join to create is deleted\nThis join to create was created by <@${x.AuthorID}>`
            }})
        }
    })
}