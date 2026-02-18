/******************************************************************************************
* Objetivo: Projeto para realizar o cálculo de operações básicas para a empresa Cálculos SA
* Autor: Gustavo Vidal de Abreu
* Data: 13/02/2026 (sexta-feira)
* Versão: 1.0
******************************************************************************************/

// Import da biblioteca de entrada de dados
const readline = require("readline");

// Criação do objeto que guarda as entradas de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Import da biblioteca de cálculos
let calculos = require('./modulo/calculos.js')

entradaDeDados.question('\nQual operação você quer utilizar?\n[1] Adição\n[2] Subtração\n[3] Multiplicação\n[4] Divisão\n\nDigite somente 1 das opções acima: ', function (numOperacao) {
    let numeroOperacao = numOperacao
    let operacao = calculos.definirOperacao(numeroOperacao)

    if (operacao) {
        let nomeNum1 = calculos.definirNomeAoNum1(operacao)
        let nomeNum2 = calculos.definirNomeAoNum2(operacao)

        entradaDeDados.question(`\nInforme o primeiro número, ${nomeNum1}: `, function (valor1) {
            let numero1 = calculos.validarEntrada(valor1)

            if (numero1 !== false) {

                entradaDeDados.question(`Informe o segundo número, ${nomeNum2}: `, function (valor2) {
                    let numero2 = calculos.validarEntrada(valor2)

                    if (numero2 !== false) {

                        if (operacao === 'DIVISÃO' && numero2 === 0) {
                            console.log('\nNão é permitido dividir por 0!\nResultado indefinido!')
                            entradaDeDados.close()
                        } else {
                            let nomeResultado = calculos.definirNomeAoResultado(operacao)
                            let resultado = calculos.calcularResultado(operacao, numero1, numero2)

                            console.log(`\n${nomeResultado}: ${resultado}`)
                            entradaDeDados.close()
                        }
                    } else {
                        console.log('\nERRO!\nInforme somente números!')
                        entradaDeDados.close()
                    }
                })
            } else {
                console.log('\nERRO!\nInforme somente números!')
                entradaDeDados.close()
            }
        })
    } else {
        console.log('\nERRO!\nÉ aceito somente 1 das opções informadas!')
        entradaDeDados.close()
    }
})