/******************************************************************
 * Objetivo: Arquivo responsável pelos cálculos matemáticos padrões
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
******************************************************************/

// FUNÇÕES PADRÕES
// Funções para cálculos matemáticos básicos (adição, subtração, multiplicação, divisão e potenciação)
const somar         = (numero1, numero2) => Number(numero1) + Number(numero2)
const multiplicar   = (numero1, numero2) => Number(numero1) * Number(numero2)
const dividir       = (numero1, numero2) => Number(numero1) / Number(numero2)
const elevar        = (base, expoente)   => Number(base) ** Number(expoente)



// FUNÇÕES PARA O IMC
// Função que calcula o IMC
const calcularIMC = function (peso, altura, medicao) {
    let pesoInf    = Number(peso.replace(',', '.'))
    let alturaInf  = Number(altura.replace(',', '.'))
    let medicaoAlt = medicao.toUpperCase()
    let imc

    if (medicaoAlt === 'CM')
        alturaInf = dividir(alturaInf, 100)
    else if (medicaoAlt !== 'M')
        return false

    imc = (dividir(pesoInf, elevar(alturaInf, 2))).toFixed(2)
    return imc
}



// FUNÇÕES PARA A MÉDIA
// Função que calcula a média final
const calcularMedia = function (nota1, nota2, nota3, nota4) {
    let nota1Num = Number(nota1)
    let nota2Num = Number(nota2)
    let nota3Num = Number(nota3)
    let nota4Num = Number(nota4)
    let media

    media = Number(dividir(somar(somar(nota1Num, nota2Num), somar(nota3Num, nota4Num)), 4))

    if (media)
        return media.toFixed(2)
    else
        return false
}

// Função que calcula a média recuperativa, pedindo uma nota para um novo cálculo
const calcularMediaRecuperativa = function (media, notaRecuperacao) {
    let mediaNum           = Number(media)
    let notaRecuperacaoNum = Number(notaRecuperacao)
    let mediaFinal

    mediaFinal = dividir(somar(mediaNum, notaRecuperacaoNum), 2)

    if (mediaFinal)
        return mediaFinal.toFixed(2)
    else 
        return false
}



// FUNÇÕES PARA A TABUADA
// Função que calcula a tabuada
const calcularTabuada = function (tabuadaInicial, tabuadaFinal, contador, contadorFinal) {
    let tabIni  = Number(tabuadaInicial)
    let tabFim  = Number(tabuadaFinal)
    let contIni = Number(contador)
    let contFim = Number(contadorFinal)
    let resultado = ''

    for (let i = tabIni; i <= tabFim; i++) {
        resultado += `\nTabuada do [${i}]\n`

        for (let j = contIni; j <= contFim; j++)
            resultado += `${i} × ${j} = ${multiplicar(i, j)}\n`
    }

    return resultado
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
    let fim = Number(numeroFinal)
    let lista = ''
    let contador = 0

    for (let i = inicio; i <= fim; i++) {
        if (i % 2 === 0) {
            lista += i + '\n'
            contador++
        }
    }

    return lista + '|' + contador
}

// Função que calcula os números ímpares
const calcularImpares = function (numeroInicial, numeroFinal) {
    let inicio = Number(numeroInicial)
    let fim = Number(numeroFinal)
    let lista = ''
    let contador = 0

    for (let i = inicio; i <= fim; i++) {
        if (i % 2 !== 0) {
            lista += i + '\n'
            contador++
        }
    }

    return lista + '|' + contador
}



// Exportação das funções
module.exports = {
    // Padrões
    somar, multiplicar, dividir, elevar,

    // Específicas
    calcularIMC,
    calcularMedia, calcularMediaRecuperativa,
    calcularTabuada,
    calcularFatorial,
    calcularPares, calcularImpares
}