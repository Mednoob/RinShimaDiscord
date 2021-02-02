module.exports = {
    name: "avatar",
    description: "Give user Avatar",
    aliases: ["ava"],
    usage: "rin>avatar [user]",
    category: "Image",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        let user;
        if(!Arguments.length || Arguments[0] == "" || Arguments[0] == " ") user = Message.author
        else user = Message.mentions.users.first() || Rin.users.cache.get(Arguments.join(" ")) || Message.guild.members.cache.find(x => x.user.username.toLowerCase().includes(Arguments.join(" ").toLowerCase())).user || Message.author
        return Message.channel.send({embed: {
            color: "GREEN",
            title: `${user.tag} avatar`,
            fields: [
                {
                    name: "PNG",
                    value: `[32x32](${user.displayAvatarURL({format: 'png', size: 32})})
[64x64](${user.displayAvatarURL({format: 'png', size: 64})})
[128x128](${user.displayAvatarURL({format: 'png', size: 128})})
[256x256](${user.displayAvatarURL({format: 'png', size: 256})})
[512x512](${user.displayAvatarURL({format: 'png', size: 512})})
[1024x1024](${user.displayAvatarURL({format: 'png', size: 1024})})
[2048x2048](${user.displayAvatarURL({format: 'png', size: 2048})})`,
                    inline: true
                },
                {
                    name: "JPG",
                    value: `[32x32](${user.displayAvatarURL({format: 'jpg', size: 32})})
[64x64](${user.displayAvatarURL({format: 'jpg', size: 64})})
[128x128](${user.displayAvatarURL({format: 'jpg', size: 128})})
[256x256](${user.displayAvatarURL({format: 'jpg', size: 256})})
[512x512](${user.displayAvatarURL({format: 'jpg', size: 512})})
[1024x1024](${user.displayAvatarURL({format: 'jpg', size: 1024})})
[2048x2048](${user.displayAvatarURL({format: 'jpg', size: 2048})})`,
                    inline: true
                },
                {
                    name: "GIF",
                    value: `[32x32](${user.displayAvatarURL({format: 'gif', size: 32})})
[64x64](${user.displayAvatarURL({format: 'gif', size: 64})})
[128x128](${user.displayAvatarURL({format: 'gif', size: 128})})
[256x256](${user.displayAvatarURL({format: 'gif', size: 256})})
[512x512](${user.displayAvatarURL({format: 'gif', size: 512})})
[1024x1024](${user.displayAvatarURL({format: 'gif', size: 1024})})
[2048x2048](${user.displayAvatarURL({format: 'gif', size: 2048})})`
                }
            ],
            image: {
                url: user.displayAvatarURL({format: 'png', size: 2048, dynamic: true})
            }
        }})
    }
}