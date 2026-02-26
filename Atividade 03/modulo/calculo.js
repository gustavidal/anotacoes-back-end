/******************************************************************
 * Objetivo: Arquivo responsável pelos cálculos matemáticos padrões
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
******************************************************************/

// Funções para cálculos matemáticos básicos (adição, subtração, multiplicação, divisão e potenciação)
const somar         = (numero1, numero2) => Number(numero1) + Number(numero2)
const subtrair      = (numero1, numero2) => Number(numero1) - Number(numero2)
const multiplicar   = (numero1, numero2) => Number(numero1) * Number(numero2)
const dividir       = (numero1, numero2) => Number(numero1) / Number(numero2)
const elevar        = (base, expoente)   => Number(base) ** Number(expoente)

const calcularMedia = function (nota1, nota2, nota3, nota4) {
    let nota1Num = Number(nota1)
    let nota2Num = Number(nota2)
    let nota3Num = Number(nota3)
    let nota4Num = Number(nota4)
    let media

    media = Number(dividir(somar(nota1Num, nota2Num, nota3Num, nota4Num), 4))

    if (media)
        return media.toFixed(2)
    else
        return false
}

const calcularMediaRecuperativa = function (media, notaRecuperacao) {
    let mediaNum = Number(media)
    let notaRecuperacaoNum = Number(notaRecuperacao)
    let mediaFinal

    mediaFinal = dividir(somar(mediaNum, notaRecuperacaoNum), 2)

    if (mediaFinal)
        return mediaFinal.toFixed(2)
    else 
        return false
}

module.exports = {
    somar,
    subtrair,
    multiplicar,
    dividir,
    elevar,
    calcularMedia,
    calcularMediaRecuperativa
}