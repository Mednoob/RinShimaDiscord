module.exports = {
    name: "loop",
    description: "Loop the song",
    aliases: [],
    usage: "rin>loop",
    category: "Music",
    cooldown: 1000,
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send({embed: {color: "RED", description: "Queue is empty!"}});
        serverQueue.loop = !serverQueue.loop;
        message.channel.send({embed: {color: "GREEN", description: `Loop has been ${serverQueue.loop ? "enabled" : "disabled"}`}});
    }
};