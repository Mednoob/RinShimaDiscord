class Mojang {
    
    /**
     * @param {import("../../RinClient")} Rin
     */
    constructor(Rin) {
        this.Rin = Rin
    }

    Get = {

        /**
         * @param {string} Username
         * @returns {Promise<string>} `Promise<string>`
         */
        UUID: async (Username) => {
            return (await this.Rin.Util.REST(`https://api.mojang.com/users/profiles/minecraft/${Username}`)).id
        },

        /**
         * @param {string} UUID 
         */
        NameHistory: async (UUID) => {
            return await this.Rin.Util.REST(`https://api.mojang.com/user/profiles/${UUID}/names`)
        },

        /**
         * @param {string} UUID 
         */
        Profile: async (UUID) => {
            return await this.Rin.Util.REST(`https://sessionserver.mojang.com/session/minecraft/profile/${UUID}`)
        }
    }
}

module.exports = {
    Entry: Mojang
}