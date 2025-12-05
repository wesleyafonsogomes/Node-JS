// require ( para importar )

const fs = require("fs") 
// fire system 

fs.readFile("arquivo.txt", "utf8", (err, data) => {

    if(err) {
        console.log(err)

        return
    }

    console.log(data);

});