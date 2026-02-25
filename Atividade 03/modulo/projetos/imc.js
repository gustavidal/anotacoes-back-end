/*****************************************************
 * Objetivo: Arquivo responsável pelos cálculos de IMC
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*****************************************************/

const calcularIMC = function (peso, altura, medicao) {
    let pesoInf = Number(peso.replace(',', '.'))
    let alturaInf = Number(altura.replace(',', '.'))
    let medicaoAlt = medicao.toUpperCase()
    let imc

    if (medicaoAlt === 'CM') {
        alturaInf = alturaInf / 100
    } else if (medicaoAlt !== 'M') {
        return false
    }

    imc = (pesoInf / (alturaInf ** 2)).toFixed(2)
    return imc
}

module.exports = {
    calcularIMC
}