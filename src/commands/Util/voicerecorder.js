module.exports = {
    name: "voicerecorder",
    description: "Voice Recorder Module",
    aliases: ["voicerec", "vrec"],
    usage: "rin>voicerecorder",
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
            description: "Voice recorder module is not able to be used from DM"
        }});
        return Message.channel.send({embed: {
            color: "RED",
            description: "Work in Progress"
        }})
        const Pref =  Rin.GuildPrefixes.get(Message.guild.id) ? Rin.GuildPrefixes.get(Message.guild.id) : Rin.DefaultPrefix
        if(!Arguments.length) return Message.channel.send({embed: {
            color: "GREEN",
            title: "Voice Recorder Module",
            description: `\`${Pref}voicerecorder <option>\``,
            fields: [
                {
                    name: "Options",
                    value: "`record` - **Joins your voice channel and records your voice activity. I will stop recording when you stop speaking/silenced**",
                    inline: true
                }
            ]
        }});
        if(Arguments[0] == "record") {
            if(!Message.member.voice.channel) return Message.channel.send({embed: {
                color: "RED",
                description: "You're not connected to any voice channel"
            }});
            if(!Message.member.voice.channel.permissionsFor(Rin.user.id).has("CONNECT")) return Message.channel.send({embed: {
                color: "RED",
                description: "I don't have `Connect` permission to connect to your voice channel"
            }});
            if(Message.guild.me.voice.serverDeaf) return Message.channel.send({embed: {
                color: "RED",
                description: "I am deafened. Please undeafen me."
            }});
            if(Message.member.voice.mute || Message.member.voice.serverMute) return Message.channel.send({embed: {
                color: "RED",
                description: "You're muted. Please, unmute yourself first"
            }});
            Message.member.voice.channel.join().then(async Ch => {
                await Message.channel.send({embed: {
                    color: "GREEN",
                    description: "Recording..."
                }});
                const Receiver = Ch.receiver.createStream(Message.author.id, {mode: "opus", end: "silence"});
                let Result;
                Receiver.on("data", (Chunk) => {
                    Result = Chunk;
                    Receiver.emit("close")
                });
                Receiver.on("close", () => {
                    return Message.channel.send("Done recording! Here's the recording", new (require("discord.js").MessageAttachment)(Result, "record.mp3"))
                })
            })
        }
    }
}