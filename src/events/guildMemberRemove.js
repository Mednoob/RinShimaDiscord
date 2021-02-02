/**
 * 
 * @param {import("../classes/RinClient")} Rin 
 * @param {import("discord.js").GuildMember} Member 
 */
module.exports = async (Rin, Member) => {
    if(Member.partial) Member.fetch()
    let GuildGoodbye = Rin.GuildGoodbyes.get(Member.guild.id)
    if(!GuildGoodbye) return;
    let Goodbye = GuildGoodbye.message.content.split(" ")
    let GoodbyeEdit = Goodbye;
    GoodbyeEdit = GoodbyeEdit.join(" ")
    return Rin.channels.cache.get(GuildGoodbye.channel.id).send(Rin.ReplacePlaceholder(GoodbyeEdit, Member))
}