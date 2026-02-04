/**************************************************************
* Objetivo: Projeto para realizar o cálculo de médias escolares
* Autor: Gustavo Vidal de Abreu
* Data: 29/01/2026 (quinta-feira)
* Versão: 1.0
**************************************************************/

/*
    Tipos de criação de variáveis:
        - var   -> Permite criar um espaço em memória do tipo variável. Essa forma de criação, hoje, é considerada mais antiga e, provável, que seja encontrada apenas em projetos mais antigos. Caso precise utilizá-lo, recomenda-se utilizar somente em escopo global.

        - let   -> Permite criar um espaço em memória do tipo variável. Essa forma de criação é realizada somente no escopo local, ou seja, dentro de bloco de programação {}. O mesmo deixa de existir ao término do bloco.

        - const -> Permite criar um espaço em memória do tipo constante. Essa forma de criação não poderá sofrer mudanças durante o projeto. Uma prática comum é identificá-la com LETRAS MAIÚSCULAS para facilitar sua localização.

    Operadores de comparação:
        - ==    -> Permite comparar a igualdade de conteúdos
        - !=    -> Permite comparar a diferença de conteúdos
        - <     -> Permite validar o menor valor
        - >     -> Permite validar o menor valor
        - <=    -> Permite validar se o valor é menor ou igual
        - >=    -> Permite validar se o valor é maior ou igual
        - ===   -> Permite comparar a igualdade de conteúdos e a igualdade de tipagem de dados
        - !==   -> Permite comparar a diferença de conteúdos e a igualdade de tipagem de dados
        - ==!   -> Permite comparar a igualdade de conteúdos e a diferença de tipagem de dados

    Operadores lógicos:
        - || -> or  -> significa "ou"
        - && -> and -> significa "e"
        - !  -> not -> significa "não"
    
    Conversão de dados:
        - parseInt()    -> Permite converter um conteúdo em número INTEIRO
        - parseFloat()  -> Permite converter um conteúdo em número DECIMAL
        - Number()      -> Permite converter um conteúdo em NÚMERO, inteiro ou decimal de forma automática
        - String()      -> Permite converter um conteúdo em STRING
        - Boolean()     -> Permite converter um conteúdo em BOOLEAN (true, false)
        - typeof()      -> Retorna o tipo de dados de uma variável (String, Number, Boolean ou Object)
*/

// Import da biblioteca de entrada de dados
const readline = require("readline");

// Criação do objeto que guarda as entradas de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Entrada de dados do nome
entradaDeDados.question("Digite o nome do aluno: ", function (nome) {
    // Recebe o nome do aluno
    let nomeAluno = nome;

    // Entrada de dados do nota1
    entradaDeDados.question("Digite a nota 1: ", function (valor1) {
        // Recebe o nome da nota1
        let nota1 = valor1;

        // Entrada de dados do nota2
        entradaDeDados.question("Digite a nota 2: ", function (valor2) {
            // Recebe o nome da nota2
            let nota2 = valor2;

            // Entrada de dados do nota3
            entradaDeDados.question("Digite a nota 3: ", function (valor3) {
                // Recebe o nome da nota3
                let nota3 = valor3;

                // Entrada de dados do nota4
                entradaDeDados.question("Digite a nota 4: ", function (valor4) {
                    // Recebe o nome da nota4
                    let nota4 = valor4;

                    // Validação de entrada vazia
                    if (nomeAluno == "" || nota1 == "" || nota2 == "" || nota3 == "" || nota4 == "") {
                        console.log("\nERRO!\nPreencha todos os campos!");
                        // Validação de entrada de número apenas entre 0 e 100
                    } else if (nota1 < 0 || nota1 > 100 || nota2 < 0 || nota2 > 100 || nota3 < 0 || nota3 > 100 || nota4 < 0 || nota4 > 100) {
                        console.log("\nERRO!\nAs notas informadas devem ser de 0 a 100!");
                        // Validação de entrada somente de números
                        // isNaN() -> Permite a validação de números ou letras
                    } else if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)) {
                        console.log("\nERRO!\nÉ permitido somente números na entrada das notas!");
                    } else {
                        // Cálculo da média
                        let media = (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4)) / 4;
                        let status;

                        // Validação do status
                        if (media >= 70.00) {
                            status = "APROVADO";
                        } else if (media < 50.00) {
                            status = "REPROVADO";
                        } else {
                            status = "RECUPERAÇÃO";
                        }

                        // Exibição do boletim
                        // toFixed() -> Permite fixar a quantidade de casas decimais
                        console.log(`\nNome do(a) aluno(a): ${nomeAluno} \nMédia final do(a) aluno(a): ${media.toFixed(2)} \nStatus do(a) aluno(a): ${status}`);
                    }
                }); // Fecha nota4
            }); // Fecha nota3
        }); // Fecha nota2
    }); // Fecha nota1
}); // Fecha nome