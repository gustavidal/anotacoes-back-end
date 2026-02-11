/****************************************************************
* Objetivo: Criar uma aplicação que realiza cálculos de juros 
* utilizando funções para modularizar o código
* Autor: Gustavo Vidal de Abreu
* Data: 11/02/2026 (quarta-feira)
* Versão: 1.0
****************************************************************/

// Import da biblioteca do readline
const readline = require('readline')

// Cria o objeto de entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Entrada do nome do cliente
entradaDeDados.question('Digite o nome do cliente: ', function(nome){
    let nomeCliente = nome

    // Entrada do nome do produto
    entradaDeDados.question('Digite o nome do produto: ', function(produto){
        let nomeProduto = produto

        // Entrada do valor da compra
        entradaDeDados.question('Digite o valor da compra: ', function(valor){
            let valorCompra = valor

            // Entrada da taxa de juros
            entradaDeDados.question('Digite a taxa de juros: ', function(taxa){
                let taxaJuros = taxa

                // Entrada da quantidade de parcelas
                entradaDeDados.question('Digite a quantidade de parcelas: ', function(parcelas){
                    let qtdeParcelas = parcelas

                    // Validações

                    // Cálculos
                    let percentual = Number(taxaJuros) / 100

                    let montante = Number(valorCompra) * ((1 + percentual) ** Number(qtdeParcelas))

                    console.log('O valor final é: ' + montante.toFixed(2))
                })
            })
        })
    })
})