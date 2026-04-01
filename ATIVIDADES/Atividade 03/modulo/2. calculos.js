/*******************************************************************
 * Objetivo: Arquivo responsável pelos cálculos dos dados informados
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*******************************************************************/

// FUNÇÕES PADRÕES
// Funções para cálculos matemáticos básicos (adição, subtração, multiplicação, divisão e potenciação)
const somar       = (numero1, numero2) => Number(numero1) + Number(numero2)
const multiplicar = (numero1, numero2) => Number(numero1) * Number(numero2)
const dividir     = (numero1, numero2) => Number(numero1) / Number(numero2)
const elevar      = (base, expoente)   => Number(base)   ** Number(expoente)



// FUNÇÕES PARA O IMC
// Função que calcula o IMC
const calcularIMC = function (peso, altura, medicao) {
    let pesoInf    = Number(peso.replace(',', '.'))
    let alturaInf  = Number(altura.replace(',', '.'))
    let medicaoAlt = medicao.toUpperCase()
    let imc

    if (medicaoAlt === 'CM')
        alturaInf = dividir(alturaInf, 100)

    imc = Number((dividir(pesoInf, elevar(alturaInf, 2))).toFixed(2))
    
    return imc
}



// FUNÇÕES PARA A MÉDIA
// Função que calcula a média final
const calcularMedia = function (nota1, nota2, nota3, nota4) {
    let nota1Num = Number(nota1)
    let nota2Num = Number(nota2)
    let nota3Num = Number(nota3)
    let nota4Num = Number(nota4)
    let mediaFinal

    mediaFinal = Number((dividir(somar(somar(nota1Num, nota2Num), somar(nota3Num, nota4Num)), 4)).toFixed(2))
    
    return mediaFinal
}

// Função que calcula a média recuperativa, pedindo uma nota para um novo cálculo
const calcularMediaRecuperativa = function (media, notaRecuperacao) {
    let mediaNum   = Number(media)
    let notaRecNum = Number(notaRecuperacao)
    let mediaExame

    mediaExame = Number((dividir(somar(mediaNum, notaRecNum), 2)).toFixed(2))

    return mediaExame
}



// FUNÇÕES PARA O FATORIAL
// Função que calcula o fatorial
const calcularFatorial = function (numero) {
    let fatorial = 1

    for (let i = 1; i <= numero; i++)
        fatorial *= i

    return fatorial
}



// FUNÇÕES PARA PAR E ÍMPAR
// Função que calcula os números pares
const calcularPares = function (numeroInicial, numeroFinal) {
    let inicio = Number(numeroInicial)
    let fim    = Number(numeroFinal)
    let lista  = ''
    let cont   = 0

    for (let i = inicio; i <= fim; i++) {
        if (i % 2 === 0) {
            lista += i + '\n'
            cont++
        }
    }

    return lista + '|' + cont
}

// Função que calcula os números ímpares
const calcularImpares = function (numeroInicial, numeroFinal) {
    let inicio = Number(numeroInicial)
    let fim    = Number(numeroFinal)
    let lista  = ''
    let cont   = 0

    for (let i = inicio; i <= fim; i++) {
        if (i % 2 !== 0) {
            lista += i + '\n'
            cont++
        }
    }

    return lista + '|' + cont
}



// Exportação das funções
module.exports = {
    // Padrões
    somar, multiplicar, dividir, elevar,

    // Específicas
    calcularIMC,
    calcularMedia, calcularMediaRecuperativa,
    calcularFatorial,
    calcularPares, calcularImpares
}