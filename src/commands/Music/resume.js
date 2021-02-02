module.exports = {
    name: "resume",
    description: "Resume the song",
    aliases: [],
    usage: "rin>resume",
    category: "Music",
    cooldown: 1000,
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send({embed: {color: "RED", description: "Queue is empty!"}});
        if (serverQueue.playing) return message.channel.send({embed: {color: "RED", description: "Queue is being played"}});
        serverQueue.resume();
        message.channel.send({embed: {color: "GREEN", description: "Resumed!"}});
    }
};