/********************************************************************
 * Objetivo: Arquivo responsável pelas validações de entrada de dados
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
********************************************************************/

// FUNÇÕES PADRÕES
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

// Função que retorna um boolean para com a validação de se um número for inteiro ou não
const validarNumeroInteiro = function (numero) {
    let numeroInf = Number(numero)

    if (Number.isInteger(numeroInf))
        return true
    else
        return false
}

// Funções para comparar dois números e retornar um booleano para cada comparação (maior, menor e igual)
const serMaior = (numero1, numero2) => Number(numero1) > Number(numero2)
const serMenor = (numero1, numero2) => Number(numero1) < Number(numero2)
const serIgual = (numero1, numero2) => Number(numero1) === Number(numero2)



// FUNÇÕES PARA O IMC
// Função que retorna um boolean para com a inserção sobre a medição de altura
const validarMedicaoDeAltura = function (medicao) {
    let medicaoAlt = medicao.trim().toUpperCase()
    if (medicaoAlt === 'CM' || medicaoAlt === "CENTÍMETROS" || medicaoAlt === 'CENTIMETROS' ||
        medicaoAlt === 'M' || medicaoAlt === 'METROS')
        return true
    else
        return false
}



// FUNÇÕES PARA A MÉDIA
// Função que retorna um boolean para com o tamanho da nota inserida
const validarTamanhoDaNota = function (nota) {
    let notaNum = Number(nota)

    if (notaNum >= 0 && notaNum <= 100)
        return true
    else
        return false
}



// FUNÇÕES PARA A TABUADA
// Função que retorna um boolean para com a validação específica para a entrada de cálculos da tabuada
const validarNumeroParaTabuada = function (numero) {
    let numeroInf = Number(numero)

    if (numeroInf < 2 || numeroInf > 100)
        return false
    else
        return true
}



// Exportação das funções
module.exports = {
    // Padrões
    validarEntradaDeString, validarEntradaDeNumber, validarTipoDeCalculadora, validarNumeroInteiro,
    serMaior, serMenor, serIgual,

    // Específicas
    validarMedicaoDeAltura,
    validarTamanhoDaNota,
    validarNumeroParaTabuada
}