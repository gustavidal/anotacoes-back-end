/**********************************************************
 * Objetivo: Arquivo responsável pelos cálculos de fatorial
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
**********************************************************/

const calcularFatorial = function (numero) {
    let fatorial = 1

    for (let i = 1; i <= numero; i++) {
        fatorial *= i
    }
    
    return fatorial
}

const montarExpressaoFatorial = function (numero) {
    let expressao = ''

    for (let i = numero; i >= 1; i--) {
        expressao += i
        if (i > 1)
            expressao += '×'
    }

    return expressao
}

module.exports = {
    calcularFatorial,
    montarExpressaoFatorial
}