/**
 * @param {import("../classes/RinClient")} Rin
 */
module.exports = async (Rin) => {
    const App = require("express")()
    const Http = require("http")
    const HttpServer = Http.createServer(App)
    const Io = require("socket.io")(HttpServer)
    App.set("views", "src/views")
    App.set("view engine", "ejs")
    Rin.Update = false;

    App.get("/", (Req, Res) => {
        Res.render("pages/index", {
            Rin
        })
    })

    App.get("/commands/:Cat", (Req, Res) => {
        if(!Rin.Categories.keyArray().includes(Req.params.Cat)) {
            Res.redirect("/")
        } else {
            Res.render("pages/category", {
                Rin,
                CategoryName: Req.params.Cat,
                CommandsName: Rin.Categories.get(Req.params.Cat).map(x => x.split(".")[0]),
                require,
                PrettyMs: require("pretty-ms")
            })
        }
    })
    
    App.get("*", (Req, Res) => {
        Res.redirect("/")
    })

    Io.on("connection", socket => {
        setInterval(() => {
            socket.emit("pingUpdate", Rin)
            Rin.Update = true;
        }, 1000)
    })

    HttpServer.listen(3000, () => {
        console.log("[HTTPServer] HTTP Server is ready on port: 3000")
    })
    Rin.HttpServer = HttpServer
    Rin.ExpressServer = App
}