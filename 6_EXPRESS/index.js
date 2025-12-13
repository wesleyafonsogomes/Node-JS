const express = require("express")
const app = express();

const PORT = 3000

// let o body, define qquqe o express deve usar o Body parser para ler os dados do form

app.use(
    express.urlencoded({
        extended: true,
    }),
)

// let e transformar em json
app.use(express.json())

// arquivos estáticos 

app.use(express.static("public"))


// rota principal 

const users = require("./users")
app.use("/users", users)

// render html com path

const path = require("path")
const basePath = path.join(__dirname, "../templates")

// midlware do error 404

app.use((req,res,next) => {
    res.status(404).sendFile(`${basePath}/404.html`)
})

// middlewares

const checkAuth = (req,res,next) => {
    req.authStatus = true

    if(req.authStatus) {
        console.log("Está logado, pode continuar!")
        next()
    } else {
        console.log("Não está logado, faça o login para continuar")
        next()
    }
}

// app.use(checkAuth);


app.listen(PORT, () => {
    console.log(`Online na porta: ${PORT}`)
});




