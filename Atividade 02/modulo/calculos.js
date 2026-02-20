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

    if (opcaoOperacao === '1') {
        operacao = 'ADIÇÃO'
    } else if (opcaoOperacao === '2') {
        operacao = 'SUBTRAÇÃO'
    } else if (opcaoOperacao === '3') {
        operacao = 'MULTIPLICAÇÃO'
    } else if (opcaoOperacao === '4') {
        operacao = 'DIVISÃO'
    } else {
        return false
    }

    return operacao
}

// Função para retornar o nome do primeiro valor
function definirNomeAoNum1(operacao) {
    let tipoOperacao = operacao
    let nomeNum1

    if (tipoOperacao === 'ADIÇÃO') {
        nomeNum1 = 'a 1ª parcela'
    } else if (tipoOperacao === 'SUBTRAÇÃO') {
        nomeNum1 = 'o minuendo'
    } else if (tipoOperacao === 'MULTIPLICAÇÃO') {
        nomeNum1 = 'o 1º fator'
    } else {
        nomeNum1 = 'o dividendo'
    }

    return nomeNum1
}

// Função para retornar o nome do segundo valor
function definirNomeAoNum2(operacao) {
    let tipoOperacao = operacao
    let nomeNum2

    if (tipoOperacao === 'ADIÇÃO') {
        nomeNum2 = 'a 2ª parcela'
    } else if (tipoOperacao === 'SUBTRAÇÃO') {
        nomeNum2 = 'o subtraendo'
    } else if (tipoOperacao === 'MULTIPLICAÇÃO') {
        nomeNum2 = 'o 2º fator'
    } else {
        nomeNum2 = 'o divisor'
    }

    return nomeNum2
}

// Função para retornar o nome do resultado da operação
function definirNomeAoResultado(operacao) {
    let tipoOperacao = operacao
    let nomeResultado

    if (tipoOperacao === 'ADIÇÃO') {
        nomeResultado = 'da soma'
    } else if (tipoOperacao === 'SUBTRAÇÃO') {
        nomeResultado = 'da diferença'
    } else if (tipoOperacao === 'MULTIPLICAÇÃO') {
        nomeResultado = 'do produto'
    } else {
        nomeResultado = 'do quociente'
    }

    return nomeResultado
}

// Função para retornar a validação de entrada de dados
function validarEntrada(valor) {
    let numero = Number(valor.replace(',', '.'))

    if (valor.trim() === '' || isNaN(numero)) {
        return false
    } else {
        return numero
    }
}

// Função para retornar o resultado da operação escolhida
function calcularResultado(operacao, numero1, numero2) {
    let tipoOperacao = operacao
    let valor1 = numero1
    let valor2 = numero2
    let resultado

    if (tipoOperacao === 'ADIÇÃO') {
        resultado = valor1 + valor2
    } else if (tipoOperacao === 'SUBTRAÇÃO') {
        resultado = valor1 - valor2
    } else if (tipoOperacao === 'MULTIPLICAÇÃO') {
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
    validarEntrada,
    calcularResultado
}