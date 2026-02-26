/*****************************************************
 * Objetivo: Arquivo responsável pelos cálculos de IMC
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*****************************************************/

// Import da biblioteca de cálculos
let calculos = require('../calculo.js')

const calcularIMC = function (peso, altura, medicao) {
    let pesoInf = Number(peso.replace(',', '.'))
    let alturaInf = Number(altura.replace(',', '.'))
    let medicaoAlt = medicao.toUpperCase()
    let imc

    if (medicaoAlt === 'CM') {
        alturaInf = calculos.dividir(alturaInf, 100)
    } else if (medicaoAlt !== 'M') {
        return false
    }

    imc = (calculos.dividir(pesoInf, calculos.elevar(alturaInf, 2))).toFixed(2)
    return imc
}

const classificarIMC = function (imc) {
    let imcNum = Number(imc)
    let classificacao = ''

    if (imcNum < 18.5) {
        classificacao = 'Abaixo do peso'
    } else if (imcNum >= 18.5 && imcNum < 25) {
        classificacao = 'Peso normal'
    } else if (imcNum >= 25 && imcNum < 30) {
        classificacao = 'Acima do peso (sobrepeso)'
    } else if (imcNum >= 30 && imcNum < 35) {
        classificacao = 'Obesidade grau I'
    } else if (imcNum >= 35 && imcNum < 40) {
        classificacao = 'Obesidade grau II'
    } else if (imcNum >= 40) {
        classificacao = 'Obesidade grau III'
    }

    return classificacao
}

module.exports = {
    calcularIMC,
    classificarIMC
}