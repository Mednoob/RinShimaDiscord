module.exports = {
    name: "katakanatable",
    description: "Shows Katakana table",
    aliases: ["katatable", "kt"],
    usage: "rin>katakanatable",
    category: "Japanese",
    cooldown: 1000,
    /**
     * @param {import("../../classes/RinClient")} Rin
     * @param {import("discord.js").Message} Message
     * @param {string[]} Arguments
     */
    run: async (Rin, Message, Arguments) => {
        return Message.channel.send(new (require("discord.js").MessageEmbed)().setColor("GREEN").attachFiles(new (require("discord.js").MessageAttachment)("src/assets/japanese/Katakana_Table_Fix.png", "Katakana_Table.png")).setImage("attachment://Katakana_Table.png").setFooter("Image taken from wikipedia").setTitle("Katakana Table").setFooter("Blue arrows are indicating the steps to write the letter"))
    }
}