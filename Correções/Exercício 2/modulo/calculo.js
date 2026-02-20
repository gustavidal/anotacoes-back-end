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

// Exemplo de função anônima
// Função para calcular as 4 operações matemáticas
const calcular = function (numero1, numero2, operador) {
    // Entrada de dados
    let valor1 = Number(numero1)
    let valor2 = Number(numero2)
    let operadorMatematico = String(operador).toUpperCase()

    let resultado

    // Processamento
    // if (operadorMatematico == 'SOMAR') {
    //     resultado = valor1 + valor2
    // } else if (operadorMatematico == 'SUBTRAIR') {
    //     resultado = valor1 - valor2
    // } else if (operadorMatematico == 'MULTIPLICAR') {
    //     resultado = valor1 * valor2
    // } else if (operadorMatematico == 'DIVIDIR') {
    //     resultado = valor1 / valor2
    // }

    switch (operadorMatematico) {
        case 'SOMAR':       resultado = valor1 + valor2; break;
        case 'SUBTRAIR':    resultado = valor1 - valor2; break;
        case 'MULTIPLICAR': resultado = valor1 * valor2; break;
        case 'DIVIDIR':     resultado = valor1 / valor2; break;
    }

    // Saída
    if (resultado != undefined) { return resultado } else { return false }
}

let result = calcular(13, 665, 'somar')

console.log(result)
// if (result) {
//     console.log(result)
// } else {
//     console.log('ERRO')
// }
