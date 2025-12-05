const chalk = require("chalk");

const nota = 9

if(nota >= 6) {
    console.log(chalk.green("Parabéns, você está aprovado!"));
} else {
    console.log(chalk.red("Você precisa fazer a prova de recuperação!"));
}

