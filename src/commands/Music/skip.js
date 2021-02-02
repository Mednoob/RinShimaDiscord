module.exports = {
    name: "skip",
    description: "Skip the song",
    aliases: [],
    usage: "rin>skip",
    category: "Music",
    cooldown: 1000,
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send({embed: {color: "RED", description: "Queue is empty!"}});
        if (!serverQueue.playing) serverQueue.playing = true;
        serverQueue.skip();
        message.channel.send({embed: {color: "RED", description: "Skipped!"}});
    }
};