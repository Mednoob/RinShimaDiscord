const { readdirSync } = require("fs")

/**
 * 
 * @param {import("../classes/RinClient")} Rin 
 * @param {NodeJS.Process} Process 
 */
module.exports = (Rin, Process) => {
    const ProcessEvents = readdirSync("src/processevents")

    for(const ProcessEvent of ProcessEvents) {
        const File = require(`../processevents/${ProcessEvent}`)

        console.log(`[ProcessEventHandler] ${ProcessEvent.split(".")[0]}`)

        Process.on(ProcessEvent.split(".")[0], (...args) => File(Rin, ...args))
    }
}