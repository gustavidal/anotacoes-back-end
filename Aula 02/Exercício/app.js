/**************************************************************
* Objetivo: Projeto para realizar o cálculo de médias escolares
* Autor: Gustavo Vidal de Abreu
* Data: 29/01/2026 (quinta-feira)
* Versão: 1.0
**************************************************************/

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

                    // Cálculo da média
                    let media = calcularMedia(nota1, nota2, nota3, nota4, nomeAluno);
                    let status = validarStatus(media)

                    // Exibição do boletim
                    if (media && status) {
                        console.log(`\nNome do(a) aluno(a): ${nomeAluno} \nMédia final do(a) aluno(a): ${media} \nStatus do(a) aluno(a): ${status}`);
                    } else {
                        console.log('Dados informados incorretamente!')
                    }
                }); // Fecha nota4
            }); // Fecha nota3
        }); // Fecha nota2
    }); // Fecha nota1
}); // Fecha nome

function calcularMedia(n1, n2, n3, n4, nome) {
    let nomeAluno = nome
    let nota1 = Number(n1)
    let nota2 = Number(n2)
    let nota3 = Number(n3)
    let nota4 = Number(n4)

    if (nomeAluno == '' || !isNaN(nomeAluno) ||
        n1 == '' || n1 < 0 || n1 > 100 || isNaN(n1) ||
        n2 == '' || n2 < 0 || n2 > 100 || isNaN(n2) ||
        n3 == '' || n3 < 0 || n3 > 100 || isNaN(n3) ||
        n4 == '' || n4 < 0 || n4 > 100 || isNaN(n4)) {
        return false
    } else {
        let media = (nota1 + nota2 + nota3 + nota4) / 4
        return Number(media.toFixed(2))
    }
}

function validarStatus(media) {
    let mediaAluno = media
    let status

    if (media) {
        if (mediaAluno >= 70) {
            status = "APROVADO";
        } else if (mediaAluno < 50) {
            status = "REPROVADO";
        } else {
            status = "RECUPERAÇÃO";
        }

        return status
    } else {
        return false
    }
}