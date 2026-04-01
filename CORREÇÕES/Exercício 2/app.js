/****************************************************************************
 * Objetivo: Arquivo responsável SOMENTE pela entrada e saída de dados
 * Data: 20/02/2026
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
 ***************************************************************************/

// Import da biblioteca de cálculos
const calculosMatematicos = require('./modulo/calculo.js')

let n1 = '10,5'
let n2 = 20
let operador = 'somar'

let validar = calculosMatematicos.validarDados(n1, n2, operador)

if (validar) {
    let result = calculosMatematicos.calcular(80, 55, operador)
    if (result)
        console.log(result)
    else
        console.log('ERRO: Não foi possível fazer o cálculo!')
} else
    console.log('ERRO: Validação de dados incorreta!')