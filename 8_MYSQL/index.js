const express = require("express")
const { engine } = require("express-handlebars")
const mysql = require("mysql2")

const app = express();

app.engine("handlebars", engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

// rotas

app.get("/", (req,res) => {
    res.render("home")
})

// conexão com o mysql 

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "99572196",
    database: "nodemysql"
})

// executar conn

conn.connect((err) => {
    if(err) {
        console.log(err)
    }

    console.log("Conectou ao MySQL")

    app.listen(3000);
})