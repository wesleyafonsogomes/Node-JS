// externo

const miniMist = require("minimist");

// interno 

const args = miniMist(process.argv.slice(2));
const soma = require("./soma").soma;

const a = parseInt(args["a"]);
const b = parseInt(args["b"]);

// parseInt??

soma(a, b);


