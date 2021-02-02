/**
 * @param {import("../classes/RinClient")} Rin
 * @param {import("discord.js").VoiceState} OldState
 * @param {import("discord.js").VoiceState} NewState
 */
module.exports = async (Rin, OldState, NewState) => {
    const OldGuildJtcData = Rin.JtcData.get(OldState.guild.id)
    if(!OldGuildJtcData) return;
    if(!NewState.channelID) {
        const OldMemberJtcData = Rin.OnGoingJtcData.get(`${OldState.guild.id}_${OldState.member.user.id}`)
        if(!OldMemberJtcData) return;
        if(OldState.channelID == OldMemberJtcData.VoiceChannelID) {
            Rin.OnGoingJtcData.delete(`${OldState.guild.id}_${OldState.member.user.id}`)
            return OldState.channel.delete()
        }
    } else if(NewState.channelID) {
        if(NewState.channelID == Rin.JtcData.get(NewState.guild.id).VoiceChannelID) {
            if(Rin.OnGoingJtcData.get(`${NewState.guild.id}_${NewState.member.user.id}`)) {
                Rin.channels.cache.get(Rin.OnGoingJtcData.get(`${NewState.guild.id}_${NewState.member.user.id}`).VoiceChannelID).delete()
                Rin.OnGoingJtcData.delete(`${NewState.guild.id}_${NewState.member.user.id}`)
            }
            const JtcGuildData = Rin.JtcData.get(NewState.guild.id)
            const NewChannel = await NewState.guild.channels.create(`${NewState.member.user.username}`, {
                type: "voice",
                parent: JtcGuildData.CategoryID,
                permissionOverwrites: [
                    {
                        id: NewState.member.user.id,
                        allow: ["MANAGE_CHANNELS", "MANAGE_ROLES"]
                    }
                ]
            })
            NewState.setChannel(NewChannel.id, "Join To Create")
            return Rin.OnGoingJtcData.set(`${NewState.guild.id}_${NewState.member.user.id}`, { VoiceChannelID: NewChannel.id, AuthorID: NewState.member.user.id, GuildID: NewState.guild.id })
        }
        const OldMemberJtcData = Rin.OnGoingJtcData.get(`${OldState.guild.id}_${OldState.member.user.id}`)
        if(!OldMemberJtcData) return;
        if(OldState.channelID == OldMemberJtcData.VoiceChannelID && NewState.channelID != OldState.channelID) {
            OldState.channel.delete("Join To Create author left the channel")
            return Rin.OnGoingJtcData.delete(`${OldState.guild.id}_${OldState.member.user.id}`)
        }
    }
}