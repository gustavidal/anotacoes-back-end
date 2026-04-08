/****************************************************************************
 * Objetivo: Arquivo responsável por gerar uma tabuada utilizando while e for
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
****************************************************************************/

// Import da biblioteca de operações matemáticas
const calculosMatematicos = require('./calculo.js')

// Função para imprimir a tabuada
const gerarTabuadaWhile = function (tabuada) {
    let tab = Number(tabuada)
    let cont = 0
    let resultado

    // Processamento
    while (cont <= 10) {
        resultado = calculosMatematicos.multiplicar(tab, cont)
        console.log(tab + ' × ' + cont + ' = ' + resultado)

        // cont = cont + 1
        // cont++
        cont += 1
    }
}

const gerarTabuadaFor = function (tabuada) {
    let tab = Number(tabuada)
    let resultado

    // Processamento
    for (let cont = 0; cont <= 10; cont += 1) {
        resultado = calculosMatematicos.multiplicar(tab, cont)
        console.log(tab + ' × ' + cont + ' = ' + resultado)
    }
}

gerarTabuadaWhile(2)
gerarTabuadaFor(5)