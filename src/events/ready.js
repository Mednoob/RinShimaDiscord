const MusicManager = require("../classes/MusicManager")

/**
 * 
 * @param {import("../classes/RinClient")} Rin
 */
module.exports = async Rin => {
    console.log("\x1b[32m", `${Rin.user.tag} is Ready! It took about ${require("pretty-ms")(Date.now() - Rin.DateNow, {verbose: true})} to prepare the client.`)

    Rin.musicManager = new MusicManager(Rin)

    setInterval(() => {
        const Status = [`Camping in ${Rin.guilds.cache.size} Servers`, `Camping with ${Rin.users.cache.size} Users/Campers`]
        const Num = Math.floor(Math.random() * Status.length)

        Rin.user.setActivity(Status[Num], {type: "PLAYING"})
    }, 60000)
}