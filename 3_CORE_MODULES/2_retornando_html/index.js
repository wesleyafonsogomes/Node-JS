const http = require("http")
const port = 3000
const server = http.createServer((req,res) => {
    res.statusCode = 200
    res.setHeader("Contenty-type", "text/html")
    res.end("<h1>Olá mundo</h1><p>Testando att</p>")
})

server.listen(port, () => {
    console.log("Servidor rodando na porta 3000");
})

