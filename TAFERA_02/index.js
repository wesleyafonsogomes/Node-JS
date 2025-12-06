const inquirer = require("inquirer");
const chalk = require("chalk");


inquirer.prompt([
    {
        name: "p1",
        message: "Qual seu nome? "
    },
    {
        name: "p2",
        message: "Qual a sua idade? "
    }
])
.then((answers) => {
    
    const response = `O nome do usuário é ${answers.p1} e ele tem ${answers.p2} anos`;
    
    console.log(chalk.bgYellow.black(response));

})
.catch(err => console.log(err))