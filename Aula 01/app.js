// Comentário em linha 

/*
    Comentário
        Em
    Bloco
*/

// Permite exibir um conteúdo no terminal
console.log("Testando o JS") // ";" é de uso opcional

// Cria uma variável sem tipo específico
var nome = "Gustavo"

console.log(nome)

// Concatenação de dados (texto e variável)
console.log("O nome do usuário é: " + nome)
console.log(`O nome do usuário é: ${nome}`)

// Import da biblioteca do readline
// O readline serve para permitir a entrada de dados via terminal
var readline = require("readline")

// Cria um objeto especialista em entrada de dados pelo terminal
var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Permite a entrada de dados do nome do usuário
// Método "question" utiliza uma função de callback para devolver o valor digitado pelo usuário
// Callback é uma função particular d eum método e é chamada para encaminhar um conteúdo para o desenvolvedor, esse conteúdo vem através da variável no argumento "nomeUsuario"
entradaDeDados.question("Digite seu nome: ", function(nomeUsuario){
    console.log(`Olá, ${nomeUsuario}.`)

    entradaDeDados.question("Digite seu email: ", function(emailUsuario){
        console.log(`Email "${emailUsuario}" do usuário "${nomeUsuario}" registrado!`)
    })
})