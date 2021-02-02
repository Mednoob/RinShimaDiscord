const BaseURL = "https://osu.ppy.sh/api/v2"

class OsuV2 {

    /**
     * @param {import("../../RinClient")} Rin
     */
    constructor(Rin) {
        this.Rin = Rin
    }

    clientID = 4623
    clientSecret = "1W1LxVAdVQ3UJcvFRHQf8RSaA5Pk38ouyQUpsDGo"
    grantType = "client_credentials"
    scope = "public"
    token = ""

    /**
     * @param {number} clientID
     * @param {string} clientSecret        
     * @param {"client_credentials"} grantType
     * @param {"public"|"identify"|"friends.read"} scope
     */
    async auth(clientID, clientSecret, grantType, scope) {
        const res = await this.Rin.Util.REST(`https://osu.ppy.sh/oauth/token`, "POST", {"grant_type": grantType, "client_id": clientID, "client_secret": clientSecret, "scope": scope}, {headers: {"Accept": "application/json", "Content-Type": "application/json"}})
        this.token = res.access_token
        return res
    }

    async getMe() {
        return await require("axios").default.get(`${BaseURL}/me/osu`, {headers: {Authorization: `Bearer ${this.token}`}})
    }
}

module.exports = {
    Entry: OsuV2
}