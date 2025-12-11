// modulos externos 

const inquirer = require("inquirer")
const chalk = require("chalk")

// modulos internos 

const fs = require("fs");
const { parse } = require("url");

operation();

function operation() {

    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
            "Criar conta",
            "Consultar Saldo",
            "Depositar",
            "Sacar",
            "Sair",
        ],
    },
])
    .then((answer) => {
        const action = answer["action"]
        
        if(action === "Criar conta") {
            createAccount();
        } else if(action === "Depositar") {
            deposito()
        } else if(action === "Consultar Saldo") {
            getAccountBalance()
        } else if(action === "Sacar") {
            saque()
        } else if(action === "Sair") {
            console.log(chalk.bgBlue.black("Obrigado por usar o Accounts!"))
            process.exit()
        }
    })
    .catch((err) => console.log(err))
}

// create an account
function createAccount() {
    console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"))
    console.log(chalk.green("Defina as opções da sua conta a seguir"))

    buildAccount()
}

function buildAccount() {
    inquirer.prompt([
        {
            name: "accountName",
            message: "Digite um nome para sua conta: "
        }
    ]).then(answer => {
        const accountName = answer["accountName"];

        console.info(accountName)

        if(!fs.existsSync("accounts")) {
            fs.mkdirSync("accounts")
        }

        if(fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black("Esta conta ja existe, escolha outro nome."))
            buildAccount();
            return 
        }

        fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify({ balance: 0 })
    )
    console.log(chalk.green("Parabéns, a sua conta foi criada!"))
    operation()
    })
    .catch((err) => console.log(err))
}

// deposito 

function deposito() {
    inquirer.prompt([
        {
            name: "accountName",
            message: "Qual o nome da sua conta? "
        }
    ])
    .then((answer) => {
        const accountName = answer["accountName"]

        if(!checkAccount(accountName)) {
            return deposito()
        }

        inquirer.prompt([
            {
                name: "amount",
                message:"Quanto você deseja depositar? "
            }
        ])
        .then((answer) => {
            const amount = answer["amount"]
            // add amount

            addAmount(accountName, amount)
            operation()
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}

function checkAccount(accountName) {
    if(!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black("Esta conta não existe, tente novamente!"))
        return false
    }
    return true 
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if(!amount) {
        console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde!"))
        return deposito()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
        console.log(err)
    },
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta`))

}

function getAccount(accountName) {
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: "utf-8",
        flag: "r"
    })

    return JSON.parse(accountJson)
}

// show account balance

function getAccountBalance() {
    inquirer.prompt([
        {
            name: "accountName",
            message: "Qual o nome da sua conta?"
        }
    ])
    .then((answer) => {
        const accountName = answer("accountName")
        
        if(!checkAccount(accountName)) {
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`Olá, o saldo da sua conta é de R$${accountData.balance}`))
        operation()
    })
}

// function sacar

function saque() {
    inquirer.prompt([
        {
            name: "accountName",
            message: "Qual o nome da sua conta?"
        }
    ])
    .then((answer) => {
        const accountName = answer["accountName"]

        if(!checkAccount(accountName)) {
            return saque();
        }

        inquirer.prompt([
            {
                name: "amount",
                message: "Quanto você deseja sacar? "
            }
        ])
        .then((answer) => {
            const amount = answer["amount"]
            removeAmount(accountName, amount)
        })
    })
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if(!amount) {
        console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde"))
        return saque()
    }

    if(accountData.balance < amount) {
        console.log(chalk.bgRed.black("Valor indisponível"))
        return saque()
    }

    accountData.balance = parseFloat(accountData.balancec) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        },
    )

    console.log(chalk.green(`Foi realizado um saque de R$${amount} da sua conta`));
    operation()

}