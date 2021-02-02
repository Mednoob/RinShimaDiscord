const { readdirSync } = require("fs")

module.exports = async Rin => {
    const Events = readdirSync("src/events/")

    for(const Event of Events) {
        const File = require(`../events/${Event}`)

        console.log(`[EventHandler] ${Event.split(".")[0]}`)

        Rin.on(Event.split(".")[0], (...args) => File(Rin, ...args))
    }
}