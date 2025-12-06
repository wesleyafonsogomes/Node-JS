const miniMist = require("minimist");

const args = miniMist(process.argv.slice(2));

console.log(args);

const nome = args["nome"];
const profissao = args["profissao"];

console.log(`O nome dele é ${nome} e tem a profissão de ${profissao}`);