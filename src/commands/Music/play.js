module.exports = {
    name: "play",
    description: "Play Song",
    aliases: [],
    usage: "rin>play <query>",
    category: "Music",
    cooldown: 1000,
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send({embed: {color: "RED", description: "You must join a voice channel to use this command."}});

        const track = args.join(" ");
        const song = await client.musicManager.getSongs(`ytsearch: ${track}`);
        if (!song[0]) return message.channel.send({embed: {color: "RED", description: "Couldn't find any songs."}});

        client.musicManager.handleVideo(message, message.member.voice.channel, song[0]);
    }
};
