const { readdirSync, readdir } = require("fs")

/**
 * @param {import("../classes/RinClient")} Rin
 */

module.exports = async Rin => {
    readdir("src/commands/", (Err, Categories) => {
        Categories.forEach(x => {
            readdir(`src/commands/${x}`, (Err, CommandFile) => {
                Rin.Categories.set(x, CommandFile)

                CommandFile.forEach(y => {
                    const Command = require(`../commands/${x}/${y}`)

                    Rin.Commands.set(Command.name, Command)

                    if(Command.aliases) {

                        Command.aliases.forEach(Alias => {
        
                            Rin.Aliases.set(Alias, Command)
        
                         })
        
                    }

                    console.log("\x1b[36m", `[CommandLoader] ${Command.name}${Command.aliases.length ? `(${Command.aliases.join(", ")})` : ""}`)
                })
            })

            console.log("\x1b[36m", `[CategoryLoader] ${x}`)
        })
    })
}