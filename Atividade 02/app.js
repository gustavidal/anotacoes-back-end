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

// Import da biblioteca de cálculos financeiros
let calculos = require('./modulo/calculos.js')

entradaDeDados.question('\nQual operação você quer utilizar?\n[1] Adição\n[2] Subtração\n[3] Multiplicação\n[4] Divisão\n\nDigite somente 1 das opções acima: ', function (numOperacao) {
    let numeroOperacao = numOperacao
    let operacao = definirOperacao(numeroOperacao)

    if (operacao) {
        let nomeNum1 = definirNomeAoNum1(operacao)
        let nomeNum2 = definirNomeAoNum2(operacao)

        entradaDeDados.question(`\nInforme o primeiro número, ${nomeNum1}: `, function (valor1) {
            let numero1 = validarEntradaValor1(valor1)

            if (numero1 !== null) {

                entradaDeDados.question(`Informe o segundo número, ${nomeNum2}: `, function (valor2) {
                    let numero2 = validarEntradaValor2(valor2)

                    if (numero2 !== null) {

                        if (operacao === 'DIVISÃO' && numero2 === 0) {
                            console.log('\nNão é permitido dividir por 0!\nResultado indefinido!')
                            entradaDeDados.close()
                        } else {
                            let nomeResultado = definirNomeAoResultado(operacao)
                            let resultado = calcularResultado(operacao, numero1, numero2)
                            
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

// Função para retornar o tipo de operação escolhida
function definirOperacao(opcao) {
    let opcaoOperacao = opcao
    let operacao

    if (opcao == 1 || opcao == 2 ||
        opcao == 3 || opcao == 4) {
        if (opcaoOperacao == 1) {
            return operacao = 'ADIÇÃO'
        } else if (opcaoOperacao == 2) {
            return operacao = 'SUBTRAÇÃO'
        } else if (opcaoOperacao == 3) {
            return operacao = 'MULTIPLICAÇÃO'
        } else {
            return operacao = 'DIVISÃO'
        }
    } else {
        return false
    }
}

// Função para retornar o nome do primeiro valor
function definirNomeAoNum1(operacao) {
    let tipoOperacao = operacao
    let nomeNum1

    if (tipoOperacao == 'ADIÇÃO') {
        return nomeNum1 = 'a 1ª parcela'
    } else if (tipoOperacao == 'SUBTRAÇÃO') {
        return nomeNum1 = 'o minuendo'
    } else if (tipoOperacao == 'MULTIPLICAÇÃO') {
        return nomeNum1 = 'o 1º fator'
    } else {
        return nomeNum1 = 'o dividendo'
    }
}

// Função para retornar o nome do segundo valor
function definirNomeAoNum2(operacao) {
    let tipoOperacao = operacao
    let nomeNum2

    if (tipoOperacao == 'ADIÇÃO') {
        return nomeNum2 = 'a 2ª parcela'
    } else if (tipoOperacao == 'SUBTRAÇÃO') {
        return nomeNum2 = 'o subtraendo'
    } else if (tipoOperacao == 'MULTIPLICAÇÃO') {
        return nomeNum2 = 'o 2º fator'
    } else {
        return nomeNum2 = 'o divisor'
    }
}

// Função para retornar o nome do resultado da operação
function definirNomeAoResultado(operacao) {
    let tipoOperacao = operacao
    let nomeResultado

    if (tipoOperacao == 'ADIÇÃO') {
        return nomeResultado = 'Soma'
    } else if (tipoOperacao == 'SUBTRAÇÃO') {
        return nomeResultado = 'Diferença'
    } else if (tipoOperacao == 'MULTIPLICAÇÃO') {
        return nomeResultado = 'Produto'
    } else {
        return nomeResultado = 'Quociente'
    }
}

// Função para retornar a validação de entrada de dados do primeiro valor
function validarEntradaValor1(valor) {
    let valor1 = Number(valor.replace(',', '.'))

    if (valor.trim() === '' || isNaN(valor1)) {
        return null
    } else {
        return valor1
    }
}

// Função para retornar a validação de entrada de dados do segundo valor
function validarEntradaValor2(valor) {
    let valor2 = Number(valor.replace(',', '.'))

    if (valor.trim() === '' || isNaN(valor2)) {
        return null
    }

    return valor2
}

// Função para retornar o resultado da operação escolhida
function calcularResultado(operacao, numero1, numero2) {
    let tipoOperacao = operacao
    let valor1 = numero1
    let valor2 = numero2
    let resultado

    if (tipoOperacao == 'ADIÇÃO') {
        return resultado = valor1 + valor2
    } else if (tipoOperacao == 'SUBTRAÇÃO') {
        return resultado = valor1 - valor2
    } else if (tipoOperacao == 'MULTIPLICAÇÃO') {
        return resultado = valor1 * valor2
    } else {
        return resultado = valor1 / valor2
    }
}