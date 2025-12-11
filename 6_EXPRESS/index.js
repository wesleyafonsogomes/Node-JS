const express = require("express")
const app = express();

const PORT = 3000

// render html com path

const path = require("path")
const basePath = path.join(__dirname, "templates")

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

// rotas 

app.get("/users/:id", (req,res) => {
    const id = req.params.id

    // leitura da tabela users e resgatar um usuario do banco
    console.log(`Estamos buscando pelo usuário: ${id}`)

    res.sendFile(`${basePath}/users.html`)
})



app.get("/", (req,res) => {

    res.sendFile(`${basePath}/index.html`)

})

app.listen(PORT, () => {
    console.log(`Online na porta: ${PORT}`)
});




