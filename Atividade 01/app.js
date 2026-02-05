/****************************************************************
* Objetivo: Desenvolver uma aplicação que calcula juros compostos
* de produtos parcelados para a empresa Viva Moda
* Autor: Gustavo Vidal de Abreu
* Data: 04/02/2026 (quarta-feira)
* Versão: 1.0
****************************************************************/

// Import da biblioteca de entrada de dados
const readline = require("readline");

// Criação do objeto que guarda as entradas de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Entrada de dados (nome do cliente)
entradaDeDados.question("\nOlá! Somos da empresa Viva Moda. \nDigite o nome do cliente: ", function (nome) {

    // Validação de inserção (nome do cliente)
    if (nome == "" || !isNaN(nome)) {
        console.log("O campo \"nome\" não pode ser vazio ou conter números!");
    } else {
        let nomeCliente = nome;

        // Entrada de dados (produto)
        entradaDeDados.question("Digite o produto comprado: ", function (produto) {

            // Validação de inserção (produto)
            if (produto == "" || !isNaN(produto)) {
                console.log("O campo \"produto\" não pode ser vazio ou conter números!");
            } else {
                let produtoComprado = produto;

                // Entrada de dados (valor do produto)
                entradaDeDados.question("Digite o valor do produto: R$ ", function (valor) {

                    // Validação de inserção (valor do produto)
                    if (valor == "" || isNaN(valor)) {
                        console.log("O campo \"valor\" não pode ser vazio ou conter caracteres!");
                    } else {
                        let valorProduto = (Number(valor)).toFixed(2);

                        // Entrada de dados (taxa de juros)
                        entradaDeDados.question("Digite a taxa de juros sem o símbolo %: ", function (taxa) {

                            // Validação de inserção (taxa de juros)
                            if (taxa == "" || isNaN(taxa)) {
                                console.log("O campo \"taxa\" não pode ser vazio ou conter caracteres!");
                            } else {
                                let taxaJuros = Number(taxa) / 100;

                                // Entrada de dados (forma de parcelamento)
                                entradaDeDados.question("\nEscolha a forma de parcelamento abaixo: \n[1] Mês(es) \n[2] Ano(s) \nDigite 1 ou 2: ", function (parcelamento) {

                                    // Validação de inserção (forma de parcelamento)
                                    if (parcelamento > 2 || parcelamento < 1) {
                                        console.log("Opção inválida!");
                                    } else {
                                        let formaParcelamento = parcelamento;

                                        // Entrada de dados (quantidade de parcelas)
                                        entradaDeDados.question("\nDigite a quantidade de parcelas: ", function (parcelas) {

                                            // Validação de inserção (quantidade de parcelas)
                                            if (parcelas == "" || isNaN(parcelas)) {
                                                console.log("O campo \"parcelas\" não pode ser vazio ou conter caracteres!");
                                            } else {
                                                let vezesParceladas = Number(parcelas);

                                                // Calcula a quantidade de parcelas por ano(s)
                                                if (formaParcelamento == 2) {
                                                    vezesParceladas = vezesParceladas * 12;
                                                }

                                                // Calcula o valor da montante ou valor final
                                                let montante = (valorProduto * (1 + taxaJuros) ** vezesParceladas).toFixed(2);

                                                // Calcula a diferença entre a montante e o valor inicial
                                                let diferenca = (montante - valorProduto).toFixed(2);

                                                // Descrição geral
                                                console.log("\n*********************** Viva Moda *********************");
                                                console.log(`Muito obrigado por realizar a sua compra conosco, sr(a) ${nomeCliente}.`);
                                                console.log(`A compra do produto "${produtoComprado}" tem um valor de R$ ${valorProduto}.`);
                                                console.log(`A sua compra será parcelada em ${vezesParceladas} vezes e deverá ser pago R$ ${montante} pelos ${taxa}% de juros.`);
                                                console.log(`O acréscimo realizado ao valor de R$ ${valorProduto} será de R$ ${diferenca}.`);
                                                console.log("\nMuito obrigado por escolher a Viva Moda.");
                                                console.log("*******************************************************");
                                            }
                                        }); // Fecha quantidade parcelada
                                    }
                                }); // Fecha forma de parcelamento
                            }
                        }); // Fecha taxa de juros
                    }
                }); // Fecha valor do produto
            }
        }); // Fecha produto
    }
}); // Fecha nome do cliente