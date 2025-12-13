const express = require("express");
const { route } = require("../6_EXPRESS/users");
const app = express();
const PORT = 5000;

const router = require("./router/rota");


// body and json

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

// rota padrão

app.use("/", router);


// css

app.use(express.static("public"));



app.listen(PORT, () => {
    console.log(`Online na porta: ${PORT}`)
})