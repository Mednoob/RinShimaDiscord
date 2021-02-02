module.exports = {
    name: "katakanaquiz",
    description: "Gives you a katakana quiz",
    aliases: ["kataquiz"],
    usage: "rin>katakanaquiz",
    category: "Japanese",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        const keys = Object.keys(Rin.Japanese.katakana)
        const letter = Rin.Japanese.katakana[keys[Math.floor(Math.random() * keys.length)]]
        const answers = keys.filter(x => Rin.Japanese.katakana[x] == letter)
        const kataImg = Rin.Japanese.generateImage(letter)
        await Message.channel.send(new (require("discord.js").MessageEmbed)().attachFiles(new (require("discord.js").MessageAttachment)(kataImg, "kataquiz.png")).setImage("attachment://kataquiz.png").setTitle("Hiragana Quiz").setDescription("You have 10 seconds to answer this quiz."))
        const collector = Message.channel.createMessageCollector(msg => msg.author.id == Message.author.id, {time: 10000})
        collector.on("collect", (msg) => {
            if(!answers.includes(msg.content.toLowerCase().trim())) return;
            else {
                collector.stop("correct")
            }
        })
        collector.on("end", (collected, reas) => {
            const parsed = Rin.Japanese.parseAnswers(answers)
            if(reas == "correct") return Message.channel.send(Message.author.toString(), {
                embed: {
                    color: "GREEN",
                    description: `Correct! ${parsed}`
                }
            });
            else return Message.channel.send(Message.author.toString(), {
                embed: {
                    color: "RED",
                    description: `Time's up! ${parsed}`
                }
            })
        })
    }
}