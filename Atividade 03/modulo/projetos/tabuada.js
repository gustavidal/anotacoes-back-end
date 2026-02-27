/*********************************************************
 * Objetivo: Arquivo responsável pelos cálculos de tabuada
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*********************************************************/

const validarNumeroParaTabuada = function (numero) {
    let numeroInf = Number(numero)

    if (numeroInf < 2 || numeroInf > 100)
        return false
    else
        return true
}

const calcularTabuada = function (tabuadaInicial, tabuadaFinal, contador, contadorFinal) {
    let tabIni = Number(tabuadaInicial)
    let tabFim = Number(tabuadaFinal)
    let contIni = Number(contador)
    let contFim = Number(contadorFinal)

    let resultado = ''

    for (let i = tabIni; i <= tabFim; i++) {

        resultado += `\nTabuada do [${i}]\n`

        for (let j = contIni; j <= contFim; j++) {
            resultado += `${i} × ${j} = ${i * j}\n`
        }
    }

    return resultado
}

module.exports = {
    validarNumeroParaTabuada,
    calcularTabuada
}