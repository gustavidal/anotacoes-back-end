/********************************************************************************
 * Objetivo: Arquivo responsável pelas formatações e estruturas de saída de dados
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
********************************************************************************/

// FUNÇÕES PADRÕES
// Função que reduz as possíveis entradas do tipo de calculadora para uma só
const formatarTipoDeCalculadora = function (tipo) {
    let tipoInf     = String(tipo.toUpperCase())
    let calculadora = ''

    if (tipoInf == 'IMC')
        calculadora = 'IMC'
    else if (tipoInf == 'MÉDIA' || tipoInf == 'MEDIA')
        calculadora = 'MÉDIA'
    else if (tipoInf == 'TABUADA')
        calculadora = 'CALCULADORA'
    else if (tipoInf == 'FATORIAL')
        calculadora = 'FATORIAL'
    else
        calculadora = 'PAR/ÍMPAR'
    
    return calculadora
}



// FUNÇÕES PARA O IMC
// Função que classifica o IMC de uma pessoa
const formatarClassificacaoImc = function (imc) {
    let imcNum        = Number(imc)
    let classificacao = ''

    if (imcNum < 18.5)
        classificacao = 'Abaixo do peso'
    else if (imcNum >= 18.5 && imcNum < 25)
        classificacao = 'Peso normal'
    else if (imcNum >= 25 && imcNum < 30)
        classificacao = 'Acima do peso (sobrepeso)'
    else if (imcNum >= 30 && imcNum < 35)
        classificacao = 'Obesidade grau I'
    else if (imcNum >= 35 && imcNum < 40)
        classificacao = 'Obesidade grau II'
    else
        classificacao = 'Obesidade grau III'

    return classificacao
}



// FUNÇÕES PARA A MÉDIA
// Função que define o gênero do lecionador
const formatarGeneroProfessor = function (genero) {
    let generoFormatado = genero.trim().toUpperCase()
    let sexo            = ''

    if (generoFormatado === 'MASCULINO' || generoFormatado === 'HOMEM')
        sexo = 'Professor'
    else
        sexo = 'Professora'

    return sexo
}

// Função que define o gênero do aluno
const formatarGeneroAluno = function (genero) {
    let generoFormatado = genero.trim().toUpperCase()
    let sexo            = ''

    if (generoFormatado === 'MASCULINO' || generoFormatado === 'HOMEM')
        sexo = 'aluno'
    else
        sexo = 'aluna'

    return sexo
}

// Função que classifica a média do aluno de acordo com a nota
const formatarMediaFinal = function (media) {
    let mediaNum = Number(media)
    let situacao = ''

    if (mediaNum >= 70)
        situacao = 'aprovado'
    else if (mediaNum >= 50 && mediaNum < 70)
        situacao = 'recuperação'
    else
        situacao = 'reprovado'

    return situacao
}



// FUNÇÕES PARA O FATORIAL
// Função que formata a expressão fatorial
const formatarExpressaoFatorial = function (numero) {
    let fatorialNum = Number(numero)
    let expressao   = ''

    for (let i = fatorialNum; i >= 1; i--) {
        expressao += i
        if (i > 1)
            expressao += '×'
    }

    return expressao
}



// FUNÇÕES PARA PAR E ÍMPAR
// Função que formata o resultado do cálculo de pares e ímpares
const formatarListaParesImpares = function (titulo, retornoCalculo) {
    let tituloFormatado = titulo.trim().toUpperCase()
    let partes     = retornoCalculo.split('|')
    let lista      = partes[0]
    let quantidade = partes[1]
    let texto      = '\n' + tituloFormatado + '\n'
    
    texto += lista
    texto += 'Quantidade de números encontrados: ' + quantidade + '\n'

    return texto
}



// Exportação das funções
module.exports = {
    // Padrões
    formatarTipoDeCalculadora,

    // Específicas
    formatarClassificacaoImc,
    formatarGeneroProfessor, formatarGeneroAluno, formatarMediaFinal,
    formatarExpressaoFatorial,
    formatarListaParesImpares
}