// nome 

console.log(process.argv);

// argumento está no terceiro indice

const args = process.argv.slice(2);

console.log(args);

// pegando só o nome agora

const nome = args[0].split("=")[1];

console.log(nome);

// para idade agr

const idade = args[1].split("=")[1];

console.log(`O nome é ${nome} e ele tem ${idade} anos`); 