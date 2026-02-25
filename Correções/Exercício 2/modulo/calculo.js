/****************************************************************************
 * Objetivo: Arquivo responsável pelo processamento de cáculos matemáticos
 * básicos (adição, subtração, multiplicação e divisão)
 * Data: 20/02/2026
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
****************************************************************************/

/*
 * toLowerCase() -> retorna uma string em minúsculo
 * toUpperCase() -> RETORNA UMA STRING EM MAIÚSCULO
*/

const validarDados = function (numero1, numero2, operador) {
    let valor1 = Number(numero1)
    let valor2 = Number(numero2)
    let operadorMatematico = String(operador)

    if (numero1 == '' || isNaN(numero1) || numero2 == '' || isNaN(numero2) || operador == '') {
        return false
    } else {
        return true
    }
}

// Exemplo de função anônima
// Função para calcular as 4 operações matemáticas
const calcular = function (numero1, numero2, operador) {
    // Entrada de dados
    let valor1 = Number(numero1)
    let valor2 = Number(numero2)
    let operadorMatematico = String(operador).toUpperCase()

    let resultado

    // Processamento
    // if (operadorMatematico == 'SOMAR')
    //     resultado = valor1 + valor2
    // else if (operadorMatematico == 'SUBTRAIR')
    //     resultado = valor1 - valor2
    // else if (operadorMatematico == 'MULTIPLICAR')
    //     resultado = valor1 * valor2
    // else if (operadorMatematico == 'DIVIDIR')
    //     resultado = valor1 / valor2

    switch (operadorMatematico) {
        case 'SOMAR': resultado = somar(valor1, valor2); break;
        case 'SUBTRAIR': resultado = subtrair(valor1, valor2); break;
        case 'MULTIPLICAR': resultado = multiplicar(valor1, valor2); break;
        case 'DIVIDIR': resultado = dividir(valor1, valor2); break;
    }

    // Saída
    if (resultado != undefined) { return resultado } else { return false }
}

// Exemplo de função em seta (arrow function)
const somar = (numero1, numero2) => Number(numero1) + Number(numero2)
const subtrair = (numero1, numero2) => Number(numero1) - Number(numero2)
const multiplicar = (numero1, numero2) => Number(numero1) * Number(numero2)
const dividir = (numero1, numero2) => Number(numero1) / Number(numero2)

module.exports = {
    calcular,
    somar,
    subtrair,
    multiplicar,
    dividir,
    validarDados
}