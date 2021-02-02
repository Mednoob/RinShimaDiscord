module.exports = {
    name: "nowplaying",
    description: "Show the song that is currently playing",
    aliases: ["np"],
    usage: "rin>nowplaying",
    category: "Music",
    cooldown: 1000,
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send({embed: {color: "RED", description: "Queue is empty!"}});
        if (!serverQueue.playing) return message.channel.send({embed: {color: "RED", description: "Player paused."}});
        const currSong = serverQueue.songs[0];
        message.channel.send({embed: {color: "BLUE", description: `Now playing: **${currSong.info.title}** by *${currSong.info.author}*`}});
    }
};