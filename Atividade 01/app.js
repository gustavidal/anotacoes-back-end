/****************************************************************
* Objetivo: Desenvolver uma aplicação que calcula juros compostos
* de produtos parcelados para a empresa Viva Moda
* Autor: Gustavo Vidal de Abreu
* Data: 04/02/2026 (quarta-feira)
* Versão: 1.0
**************************************************************/

// Import da biblioteca de entrada de dados
const readline = require("readline");

// Criação do objeto que guarda as entradas de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

entradaDeDados.question("\nOlá! Somos da empresa Viva Moda. \nDigite o nome do cliente: ", function (nome) {
    let nomeCliente = nome;

    if (nome == "") {
        console.log("O campo \"nome\" é obrigatório!")
    } else if (!isNaN(nome)) {
        console.log("Não é permitida a entrada de números no campo \"nome\"!")
    } else {
        entradaDeDados.question("Qual é o produto comprado? ", function (produto) {
            let produtoComprado = produto;

            if (produto == "") {
                console.log("O campo \"produto\" é obrigatório!")
            } else if (!isNaN(produto)) {
                console.log("Não é permitida a entrada de números no campo \"produto\"!")
            } else {
                entradaDeDados.question(`Qual é o valor do produto ${produtoComprado}? R$ `, function (valor) {
                    let valorProduto = (Number(valor)).toFixed(2);

                    if (valor == "") {
                        console.log("O campo \"valor\" é obrigatório!")
                    } else if (isNaN(valor)) {
                        console.log("Não é permitida a entrada de caracteres no campo \"valor\"!")
                    } else {
                        entradaDeDados.question("Qual a taxa de juros (escreva sem o símbolo de %)? ", function (taxa) {
                            let taxaJuros = Number(taxa) / 100;

                            if (taxa == "") {
                                console.log("O campo \"taxa\" é obrigatório!")
                            } else if (isNaN(taxa)) {
                                console.log("Não é permitida a entrada de caracteres no campo \"taxa\"!")
                            } else {
                                entradaDeDados.question(`Muito obrigado, ${nomeCliente}. O seu tempo de pagamento é em meses ou anos? \n[1] Meses \n[2] Anos \nDigite 1 ou 2: `, function (tempo) {
                                    let tempoEscolhido = tempo;

                                    if (tempo > 2 || tempo < 1) {
                                        console.log("Opção inválida!");
                                    } else {
                                        entradaDeDados.question("Em quantas vezes o produto foi parcelado? ", function (vezes) {
                                            let vezesParceladas = Number(vezes);
                                            if (tempoEscolhido == 2) {
                                                vezesParceladas = vezesParceladas * 12;
                                            }

                                            let montante = valorProduto * (1 + taxaJuros) ** vezesParceladas;
                                            montante = montante.toFixed(2);

                                            let diferenca = (montante - valorProduto).toFixed(2);

                                            console.log(`\n********************** Viva Moda ********************`);
                                            console.log(`Muito obrigado por realizar a sua compra conosco, sr(a) ${nomeCliente}.`);
                                            console.log(`A compra do produto ${produtoComprado} tem um valor de R$ ${valorProduto}.`);
                                            console.log(`A sua compra será parcelada em ${vezesParceladas} vezes e deverá ser pago R$ ${montante}.`);
                                            console.log(`O acréscimo realizado ao valor de R$ ${valorProduto} será de R$ ${diferenca}.`);
                                            console.log(`\nMuito obrigado por escolher a Viva Moda.`);
                                            console.log(`*******************************************************`);
                                        }); // Fecha quantidade parcelada
                                    }
                                }); // Fecha tempo
                            }
                        }); // Fecha taxa
                    }
                }); // Fecha valor
            }
        }); // Fecha produto
    }
}); // Fecha nome