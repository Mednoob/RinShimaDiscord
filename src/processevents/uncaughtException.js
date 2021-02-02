/**
 * 
 * @param {import("../classes/RinClient")} Rin 
 * @param {Error} Err 
 */
module.exports = (Rin, Err) => {
    return console.log(`[Uncaught Exception] ${Err.stack}`)
}