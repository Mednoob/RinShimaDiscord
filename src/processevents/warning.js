/**
 * 
 * @param {import("../classes/RinClient")} Rin 
 * @param {Error} Err 
 */
module.exports = (Rin, Err) => {
    console.log(`[Warning] ${Err.stack}`)
}