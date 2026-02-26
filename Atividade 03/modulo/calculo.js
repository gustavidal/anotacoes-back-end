/******************************************************************
 * Objetivo: Arquivo responsável pelos cálculos matemáticos padrões
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
******************************************************************/

// Funções para cálculos matemáticos básicos (adição, subtração, multiplicação e divisão)
const somar         = (numero1, numero2) => Number(numero1) + Number(numero2)
const subtrair      = (numero1, numero2) => Number(numero1) - Number(numero2)
const multiplicar   = (numero1, numero2) => Number(numero1) * Number(numero2)
const dividir       = (numero1, numero2) => Number(numero1) / Number(numero2)
const elevar        = (base, expoente)   => Number(base) ** Number(expoente)
const raizQuadrada  = (numero)           => Math.sqrt(Number(numero))

module.exports = {
    somar,
    subtrair,
    multiplicar,
    dividir,
    elevar,
    raizQuadrada
}