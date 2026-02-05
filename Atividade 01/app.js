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

    if (nome == "") {
        console.log("O campo \"nome\" é obrigatório!")
    } else if (!isNaN(nome)) {
        console.log("Não é permitida a entrada de números no campo \"nome\"!")
    } else {
        let nomeCliente = nome;

        entradaDeDados.question("Digite o produto comprado: ", function (produto) {

            if (produto == "") {
                console.log("O campo \"produto\" é obrigatório!")
            } else if (!isNaN(produto)) {
                console.log("Não é permitida a entrada de números no campo \"produto\"!")
            } else {
                let produtoComprado = produto;

                entradaDeDados.question(`Digite o valor do produto: R$ `, function (valor) {

                    if (valor == "") {
                        console.log("O campo \"valor\" é obrigatório!")
                    } else if (isNaN(valor)) {
                        console.log("Não é permitida a entrada de caracteres no campo \"valor\"!")
                    } else {
                        let valorProduto = (Number(valor)).toFixed(2);

                        entradaDeDados.question("Digite a taxa de juros, sem o símbolo de %: ", function (taxa) {

                            if (taxa == "") {
                                console.log("O campo \"taxa\" é obrigatório!")
                            } else if (isNaN(taxa)) {
                                console.log("Não é permitida a entrada de caracteres no campo \"taxa\"!")
                            } else {
                                let taxaJuros = Number(taxa) / 100;

                                entradaDeDados.question("\nEscolha a forma de parcelamento abaixo: \n[1] Meses \n[2] Anos \nDigite 1 ou 2: ", function (tempo) {

                                    if (tempo > 2 || tempo < 1) {
                                        console.log("Opção inválida!");
                                    } else {
                                        let tempoEscolhido = tempo;

                                        entradaDeDados.question("\nDigite a quantidade de parcelas: ", function (parcelas) {

                                            if (parcelas == "") {
                                                console.log("O campo \"parcelas\" é obrigatório!")
                                            } else if (isNaN(parcelas)) {
                                                console.log("Não é permitida a entrada de caracteres no campo \"parcelas\"!")
                                            } else {
                                                let vezesParceladas = Number(parcelas);

                                                if (tempoEscolhido == 2) {
                                                    vezesParceladas = vezesParceladas * 12;
                                                }

                                                let montante = (valorProduto * (1 + taxaJuros) ** vezesParceladas).toFixed(2);

                                                let diferenca = (montante - valorProduto).toFixed(2);

                                                console.log("\n*********************** Viva Moda *********************");
                                                console.log(`Muito obrigado por realizar a sua compra conosco, sr(a) ${nomeCliente}.`);
                                                console.log(`A compra do produto "${produtoComprado}" tem um valor de R$ ${valorProduto}.`);
                                                console.log(`A sua compra será parcelada em ${vezesParceladas} vezes e deverá ser pago R$ ${montante}.`);
                                                console.log(`O acréscimo realizado ao valor de R$ ${valorProduto} será de R$ ${diferenca}.`);
                                                console.log("\nMuito obrigado por escolher a Viva Moda.");
                                                console.log("*******************************************************");
                                            }
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