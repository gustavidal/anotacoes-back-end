/********************************************************
* Objetivo: Arquivo responsável pelas funções de cálculos
* Autor: Gustavo Vidal de Abreu
* Data: 13/02/2026 (sexta-feira)
* Versão: 1.0
********************************************************/

// Função para retornar o tipo de operação escolhida
function definirOperacao(opcao) {
    let opcaoOperacao = opcao
    let operacao

    if (opcao === '1' || opcao === '2' ||
        opcao === '3' || opcao === '4') {
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

    if (valor == '' || isNaN(valor1)) {
        return null
    } else {
        return valor1
    }
}

// Função para retornar a validação de entrada de dados do segundo valor
function validarEntradaValor2(valor) {
    let valor2 = Number(valor.replace(',', '.'))

    if (valor == '' || isNaN(valor2)) {
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
        resultado = valor1 + valor2
    } else if (tipoOperacao == 'SUBTRAÇÃO') {
        resultado = valor1 - valor2
    } else if (tipoOperacao == 'MULTIPLICAÇÃO') {
        resultado = valor1 * valor2
    } else {
        resultado = valor1 / valor2
    }

    return Number(resultado.toFixed(2))
}

module.exports = {
    definirOperacao,
    definirNomeAoNum1,
    definirNomeAoNum2,
    definirNomeAoResultado,
    validarEntradaValor1,
    validarEntradaValor2,
    calcularResultado
}