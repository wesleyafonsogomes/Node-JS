const express = require("express")
const { engine } = require("express-handlebars")

const app = express()

app.engine("handlebars", engine())
app.set("view engine", "handlebars")

// rota inicial 

app.get("/", (req,res) => {
    res.render("home", { layout: false })
})

app.listen(3000, () => {
    console.log("Online!")
})