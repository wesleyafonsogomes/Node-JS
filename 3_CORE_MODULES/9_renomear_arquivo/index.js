const fs = require("fs")

fs.rename("arquivo.txt", "novoarquivo.txt", (err) => {
    if(err) {
        console.log(err)
    }
    console.log("Arquivo renomeado!")
})