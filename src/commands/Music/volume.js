module.exports = {
    name: "volume",
    description: "Change the volume of the song",
    aliases: ["vol"],
    usage: "rin>volume <Volume>",
    category: "Music",
    cooldown: 1000,
    run: async (client, message, args) => {
        const serverQueue = client.musicManager.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send({embed: {color: "RED", description: "Queue is empty!"}});
        if (!args[0]) {
            message.channel.send({embed: {color: "BLUE", description: `Current volume: **${serverQueue.volume}%**.`}});
        } else {
            const value = args[0];
            if (isNaN(value)) return message.channel.send({embed: {color: "RED", description: "Make sure the value is a number."}});
            serverQueue.setVolume(value);
            message.channel.send({embed: {color: "GREEN", description: `New volume: **${value}%**.`}});
        }
    }
};