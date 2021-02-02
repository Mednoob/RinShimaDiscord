/**
 * 
 * @param {import("../classes/RinClient")} Rin 
 * @param {import("discord.js").GuildMember} Member 
 */
module.exports = async (Rin, Member) => {
    let GuildWelcome = Rin.GuildWelcomes.get(Member.guild.id)
    if(!GuildWelcome) return;
    let Welcome = GuildWelcome.message.content.split(" ")
    let WelcomeEdit = Welcome;
    WelcomeEdit = WelcomeEdit.join(" ")
    return Rin.channels.cache.has(GuildWelcome.channel.id) ? Rin.channels.cache.get(GuildWelcome.channel.id).send(Rin.ReplacePlaceholder(WelcomeEdit, Member)) : (await Rin.channels.fetch(GuildWelcome.channel.id)).send(Rin.ReplacePlaceholder(WelcomeEdit, Member))
}