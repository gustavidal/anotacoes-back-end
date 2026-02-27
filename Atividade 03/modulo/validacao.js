/********************************************************************
 * Objetivo: Arquivo responsável pelas validações de entrada de dados
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
********************************************************************/

// Função que retorna um boolean para com a validação simples de entrada de dados do tipo string
const validarEntradaDeString = function (dado) {
    let dadoInf = String(dado)

    if (dado.trim() === '' || !isNaN(dado))
        return false
    else
        return true
}

// Função que retorna um boolean para com a validação simples de entrada de dados do tipo number
const validarEntradaDeNumber = function (valor) {
    let valorInf = Number(valor)

    if (valor.trim() === '' || isNaN(valor))
        return false
    else
        return true
}

// Função que retorna um boolean para com a validação do tipo de calculadora escolhida
const validarTipoDeCalculadora = function (tipoCalculadora) {
    let tipoCalculadoraInf = String(tipoCalculadora)

    if (tipoCalculadoraInf === 'IMC' || 
        tipoCalculadoraInf === 'MÉDIA' || tipoCalculadoraInf === 'MEDIA' ||
        tipoCalculadoraInf === 'TABUADA' || 
        tipoCalculadoraInf === 'FATORIAL' || 
        tipoCalculadoraInf === 'PAR/ÍMPAR' || tipoCalculadoraInf === 'PAR/IMPAR' || 
        tipoCalculadoraInf === 'PAR OU ÍMPAR' || tipoCalculadoraInf === 'PAR OU IMPAR' ||
        tipoCalculadoraInf === 'PAR E ÍMPAR' || tipoCalculadoraInf === 'PAR E IMPAR' ||
        tipoCalculadoraInf === 'PAR' || tipoCalculadoraInf === 'ÍMPAR' || tipoCalculadoraInf === 'IMPAR')
        return true
    else
        return false
}

const validarNumeroInteiro = function (numero) {
    let numeroInf = Number(numero)

    if (!Number.isInteger(numeroInf))
        return false
    else
        return true
}

// Funções para comparar dois números e retornar um booleano para cada comparação (maior, menor e igual)
const serMaior = (numero1, numero2) => Number(numero1) > Number(numero2)
const serMenor = (numero1, numero2) => Number(numero1) < Number(numero2)
const serIgual = (numero1, numero2) => Number(numero1) === Number(numero2)

module.exports = {
    validarEntradaDeString,
    validarEntradaDeNumber,
    validarTipoDeCalculadora,
    serMaior,
    serMenor,
    serIgual,
    validarNumeroInteiro
}