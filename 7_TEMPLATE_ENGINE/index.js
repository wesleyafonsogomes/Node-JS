const express = require("express")
const { engine } = require("express-handlebars")

const app = express()

app.engine("handlebars", engine())
app.set("view engine", "handlebars")


// css

app.use(express.static("public"))

// rota inicial 

app.get("/dashboard", (req,res) => {

    const itens = ["Item A", "Item B", "Item C"]

    res.render("dashboard", {itens})
})

// post 

app.get("/post", (req,res) => {

    const post = {
        title: "Aprender Node.js",
        category: "JavaScript",
        body: "Este artigo vai te ajudar a aprender Node.js...",
        comments: 4,
    }

    res.render("blogpost", {post})

}) 

app.get("/", (req,res) => {

    const user = {
        name: "Wesley",
        surname: "Afonso",
        age: 30
    }

    const auth = true

    const approved = true

    res.render("home", {user, auth, approved})
})

app.listen(3000, () => {
    console.log("Online!")
})