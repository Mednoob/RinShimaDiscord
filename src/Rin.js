const RinClient = require("./classes/RinClient")

const Rin = new RinClient()

Rin.log_in()

require("./handler/EventHandler")(Rin)
require("./handler/CommandLoader")(Rin)
require("./handler/ExpressServer")(Rin)
require("./handler/ProcessEventHandler")(Rin, process)