/**
 * @class DanbooruEntry
 */
class DanbooruEntry {

    /**
     * @param {import("../../RinClient")} RinClient Client to use for the REST API Request
     */
    constructor(RinClient) {
        this.RinClient = RinClient
    }

    Get = {
        /**
         * Get random danbooru posts in an array
         * @param {boolean} NSFW Whether to include NSFW or Ero content or not
         * @returns {Promise<Object[]>} `Promise<Object[]>`
         */
        Random: async (NSFW = false) => {
            let RandomResult = await this.RinClient.Util.REST("https://danbooru.donmai.us/posts.json?random=true", "GET")
            switch (NSFW) {
                case false:
                    return RandomResult.filter(Result => Result.rating == "s")
                    break;
                case true:
                    return RandomResult
                    break;
            }
        },

        /**
         * Get random danbooru posts by tags in an array
         * @param {string[]} Tags Tags that will be searched
         * @param {boolean} NSFW Whether to include NSFW or Ero content or not
         * @returns {Promise<Object[]>} `Promise<Object[]>`
         */
        ByTag: async (Tags, NSFW = false) => {
            let RandomResult = await this.RinClient.Util.REST(`https://danbooru.donmai.us/posts.json?tags=${Tags.join("+")}&random=true`, "GET")
            switch (NSFW) {
                case false:
                    return RandomResult.filter(Result => Result.rating == "s")
                    break;
                case true:
                    return RandomResult
                    break;
            }
        }
    }
}

module.exports = {
    Entry: DanbooruEntry
}