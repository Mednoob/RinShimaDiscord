module.exports = {
    name: "queue",
    description: "Show the song queue",
    aliases: [],
    usage: "rin>queue",
    category: "Music",
    cooldown: 1000,
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send({embed: {color: "RED", description: "Queue is empty!"}});
        let index = 0;
        message.channel.send(`
**Current Queue**
${serverQueue.songs.map(songs => `**${++index}.** ${songs.info.title}`).splice(0, 10).join("\n")}
${serverQueue.songs.length <= 10 ? "" : `And ${serverQueue.songs.length - 10} more..`}
`);
    }
};