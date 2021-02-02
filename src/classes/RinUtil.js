const Axios = require("axios");

/**
 * @class parseQueryResult
 */
class parseQueryResult {
    /**
     * @param {string[]} Args
     * @param {string[]} Flags
     */
    constructor (Args, Flags) {
        this.Args = Args;
        this.Flags = Flags;
    }
}

/**
 * @class RinUtil
 */
class RinUtil {
    constructor() {}
    
    /**
     * Parse flags from an array of string
     * @param {string[]} Queries
     * @returns {parseQueryResult} `parseQueryResult`
     */
    parseQuery(Queries) {
        const Args = [];
        const Flags = [];
        for (const Query of Queries) {
            if (Query.startsWith("--")) Flags.push(Query.slice(2).toLowerCase());
            else Args.push(Query);
        }
        return new parseQueryResult(Args, Flags);
    }

    /**
     * Clean non-alphabet characters from a string
     * @param {string} Input The string that will be cleaned
     * @param {boolean} DeleteSpaces Whether to delete the spaces/whitespaces or not. The default is false
     * @returns {string} `string`
     */
    cleanNonAlphabet(Input, DeleteSpaces = false) {
        switch (DeleteSpaces) {
            case true:
                return Input.replace(/[^0-9a-z]/gi, '')
                break;
            case false:
                return Input.replace(/[^0-9a-z ]/gi, '')
                break;
        }
    }

    /**
     * REST(Representational state transfer) API Request
     * @param {string} URL The url that will be used for the REST request
     * @param {string} Method The REST request method. The default method is GET
     * @param {any[]} Args
     * @returns {Promise<any>} `Promise<any>`
     */
    async REST(URL, Method = "GET", ...Args) {
        if(Method == "GET") return Axios.default.get(URL, ...Args).then(x => x.data)
        if(Method == "POST") return Axios.default.post(URL, ...Args).then(x => x.data)
        if(Method == "PUT") return Axios.default.put(URL, ...Args).then(x => x.data)
        if(Method == "PATCH") return Axios.default.patch(URL, ...Args).then(x => x.data)
        if(Method == "DELETE") return Axios.default.delete(URL, ...Args).then(x => x.data)
    }

    /**
     * Convert Map/Collection values to array
     * @param {Map<string | number, any> | import("discord.js").Collection<String | number, any> | import("enmap")} Map The Map/Collection that will be used for its value conversion
     * @returns {Array<any>} `Array<any>`
     */
    mapValuesToArray(Map) {
        return [...Map.values()]
    }

    /**
     * Convert Map/Collection keys to array
     * @param {Map<string | number, any> | import("discord.js").Collection<String | number, any> | import("enmap")} Map The Map/Collection that will be used for its key conversion
     * @returns {Array<string | number>} `Array<string | number>`
     */
    mapKeysToArray(Map) {
        return [...Map.keys()]
    }

    /**
     * Retrieve Embed/Widget Object of a Guild from Discord API
     * @param {string} GuildID The Guild ID
     * @returns {Promise<Object>} `Promise<Object>`
     */
    async getGuildEmbedObject(GuildID) {
        return await this.REST(`https://discord.com/api/servers/${GuildID}/embed.json`)
    }

    /**
     * Gives Embed/Widget Image URL of a Guild
     * @param {string} GuildID  The Guild ID
     * @returns {string} `string`
     */
    getGuildEmbedImageURL(GuildID) {
        return `https://discord.com/api/guilds/${GuildID}/embed.png`
    }

    /**
     * Count osu! Std Accuracy
     * @param {number} threeHundredCount 300 count
     * @param {number} oneHundredCount 100 count
     * @param {number} fiftyCount 50 count
     * @param {number} zeroCount 0 count
     * @returns {number} `number`
     */
    osuStdCountAccuracy(threeHundredCount, oneHundredCount, fiftyCount, zeroCount) {
        return (50 * fiftyCount + 100 * oneHundredCount + 300 * threeHundredCount) / (300 * (zeroCount + fiftyCount + oneHundredCount + threeHundredCount));
    }

    /**
     * Count osu! Taiko Accuracy
     * @param {number} greatCount 良 count
     * @param {number} goodCount 可 count
     * @param {number} badCount 不可 count
     * @returns {number} `number` 
     */
    osuTaikoCountAccuracy(greatCount, goodCount, badCount) {
        return((0.5 * goodCount) + greatCount) / (badCount + goodCount + greatCount);
    }

    /**
     * Count osu! Catch Accuracy
     * @param {number} fruitCount Fruit count
     * @param {number} dropCount Drop count
     * @param {number} dropletCount Droplet count
     * @param {number} missedFruitDropCount Missed fruit and drop count
     * @param {number} missedDropletCount Missed droplet count
     * @returns {number} `number` 
     */
    osuCatchCountAccuracy(fruitCount, dropCount, dropletCount, missedFruitDropCount, missedDropletCount) {
        return (dropletCount + dropCount + fruitCount) / (missedDropletCount + missedFruitDropCount + dropletCount + dropCount + fruitCount)
    }

    /**
     * Count osu! Mania Accuracy
     * @param {number} maxCount MAX count
     * @param {number} threeHundredCount 300 count
     * @param {number} twoHundredCount 200 count
     * @param {number} oneHundredCount 100 count
     * @param {number} fiftyCount 50 count
     * @param {number} zeroCount 0 count
     * @returns {number} `number`
     */
    osuManiaCountAccuracy(maxCount, threeHundredCount, twoHundredCount, oneHundredCount, fiftyCount, zeroCount) {
        return ((50 * fiftyCount) + (100 * oneHundredCount) + (200 * twoHundredCount) + (300 * (threeHundredCount + maxCount))) / (300 * (zeroCount + fiftyCount + oneHundredCount + twoHundredCount + threeHundredCount + maxCount))
    }

    /**
     * Throw an error
     * @param {string} text The text of the error
     */
    throwError(text) {
        throw Error(text)
    }

    range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    /**
     * @param {number} num_1 
     * @param {number} num_2 
     */
    calcRatio(num_1, num_2){
        for(let num = num_2; num > 1; num--) {
            if((num_1 % num) == 0 && (num_2 % num) == 0) {
                num_1=num_1/num;
                num_2=num_2/num;
            }
        }
        var ratio = num_1+":"+num_2;
        return ratio;
    }

    /**
     * Removes ANSI style from a string/text
     * @param {string} text The text
     * @returns {string} `string`
     */
    clearANSI(text) {
        return require("ansi-parser").removeAnsi(text)
    }
}
module.exports = RinUtil