module.exports = {
    name: "stop",
    description: "Stop the song",
    aliases: [],
    usage: "rin>stop",
    category: "Music",
    cooldown: 1000,
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send({embed: {color: "RED", description: "Queue is empty!"}});
        serverQueue.destroy();
        message.channel.send({embed: {color: "GREEN", description: "Disconnected!"}});
    }
};