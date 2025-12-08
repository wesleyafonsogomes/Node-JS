const path = require("path")

// path absolute

console.log(path.resolve("texte.txt"))

// formar path

const midFolder = "relatorios"
const fileName = "wesley.txt"

const finalPath = path.join("/", "arquivos", midFolder, fileName);

console.log(finalPath);