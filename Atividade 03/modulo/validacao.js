/********************************************************************
 * Objetivo: Arquivo responsável pelas validações de entrada de dados
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
********************************************************************/

// Função que retorna um boolean
const validarEntradaDeString = function (dado) {
    let dadoInf = String(dado)

    if (dado.trim() === '' || !isNaN(dado))
        return false
    else
        return true
}

const validarEntradaDeNumber = function (valor) {
    let valorInf = Number(valor)

    if (valor.trim() === '' || isNaN(valor))
        return false
    else
        return true
}

module.exports = {
    validarEntradaDeString,
    validarEntradaDeNumber
}