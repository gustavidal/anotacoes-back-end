/********************************************************************************
 * Objetivo: Arquivo responsável pelas formatações e estruturas de saída de dados
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
********************************************************************************/

// FUNÇÕES PARA O IMC
// Função que classifica o IMC de uma pessoa
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



// FUNÇÕES PARA A MÉDIA
// Função que define o gênero do lecionador
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

// Função que define o gênero do aluno
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

// Função que classifica a média do aluno de acordo com a nota
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



// FUNÇÕES PARA O FATORIAL
// Função que formata a expressão fatorial
const montarExpressaoFatorial = function (numero) {
    let expressao = ''

    for (let i = numero; i >= 1; i--) {
        expressao += i
        if (i > 1)
            expressao += '×'
    }

    return expressao
}


// Exportação das funções
module.exports = {
    classificarIMC,
    definirGeneroAoProfessor, definirGeneroAoAluno, classificarMedia,
    montarExpressaoFatorial
}