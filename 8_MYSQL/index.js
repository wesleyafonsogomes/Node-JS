const e = require("express");
const express = require("express")
const { engine } = require("express-handlebars")
const mysql = require("mysql2")

const app = express();

// body and json
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.engine("handlebars", engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

// rotas

app.get("/", (req,res) => {
    res.render("home")
})

// rota p/ inserir livros

app.post("/books/insertbook", (req,res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty

    // instrução 
    const sql = `INSERT INTO books (title, pageqty) VALUES ("?, ?")`
    const data = [title, pageqty] 

    // conexão da query
    conn.query(sql, data, (err) => {
        if(err) {
            console.log(err)
        }

        res.redirect("/books")
    })
})

// mostrar todos os dados 

app.get("/books", (req,res) => {
    const sql = ("SELECT * FROM books")

    conn.query(sql, (err, data) => {
        if(err) {
            console.log(err)
            return
        }

        const books = data

        console.log(books)
        res.render("books", { books })
    })
})

// resgatar filtrando :id
app.get("/books/:id", (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id = ?`

    conn.query(sql, (err, data) => {
        if(err) {
            console.log(err)
            return
        }

        const book = data[0]
        // primeiro do array 

        res.render("book", { book })
    })
})

// create e editar 

app.get("/books/edit/:id", (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM books WHERE id = ?`

    conn.query(sql, [id], (err,data) => {
        if(err) {
            console.log(err)
            return
        }

        const book = data[0]
        res.render("editbook", { book })
    })
})

// rota post com update

app.post("/books/updatebook", (req,res) => {
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `UPDATE books SET title = ?, pageqty = ? WHERE id = ?`

    const data = [title, pageqty, id]

    conn.query(sql, data, (err) => {
        if(err) {
            console.log(err)
            return
        }

        res.redirect("/books")
    })
})

// removendo itens com DELETE

app.post("/books/remove/:id", (req,res) => {
    const id = req.params.id

    const sql = `DELETE FROM books WHERE id = ?`

    conn.query(sql, [id], (err) => {
        if(err) {
            console.log(err)
            return
        }

        res.redirect("/books")
    })
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