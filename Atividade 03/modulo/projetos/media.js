/*******************************************************
 * Objetivo: Arquivo responsável pelos cálculos de média
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*******************************************************/

// Import da biblioteca de cálculos
let calculos = require('../calculo.js')

const definirGeneroAoProfessor = function (genero) {
    let generoFormatado = genero.trim().toUpperCase()
    let sexo

    if (generoFormatado === 'MASCULINO') {
        sexo = 'Professor'
    } else if (generoFormatado === 'FEMININO') {
        sexo = 'Professora'
    } else {
        return false
    }

    return sexo
}

const definirGeneroAoAluno = function (genero) {
    let generoFormatado = genero.trim().toUpperCase()
    let sexo

    if (generoFormatado === 'MASCULINO' || generoFormatado === 'HOMEM') {
        sexo = 'aluno'
    } else if (generoFormatado === 'FEMININO') {
        sexo = 'aluna'
    } else {
        return false
    }

    return sexo
}

const validarTamanhoDaNota = function (nota) {
    let notaNum = Number(nota)

    if (notaNum >= 0 && notaNum <= 100) {
        return true
    } else {
        return false
    }
}

const classificarMedia = function (media) {
    let mediaNum = Number(media)
    let situacao

    if (mediaNum >= 70) {
        situacao = 'aprovado'
    } else if (mediaNum >= 50 && mediaNum < 70) {
        situacao = 'recuperação'
    } else if (mediaNum < 50) {
        situacao = 'reprovado'
    } else {
        return false
    }

    return situacao
}

module.exports = {
    definirGeneroAoProfessor,
    definirGeneroAoAluno,
    validarTamanhoDaNota,
    classificarMedia,
}