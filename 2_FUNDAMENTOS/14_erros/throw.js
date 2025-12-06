const x = 10

// checar se x é um número 

if(typeof x !== "number") {
    throw new Error("O valor de x não é um número inteiro")
} 

console.log("Continuando o código...");