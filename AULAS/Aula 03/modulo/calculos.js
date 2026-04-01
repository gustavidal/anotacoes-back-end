/*********************************************************************
* Objetivo: Arquivo responsável pelas funções de cálculos financeiros
* Autor: Gustavo Vidal de Abreu
* Data: 11/02/2026 (quarta-feira)
* Versão: 1.0
*********************************************************************/

// Função para retornar o percentual de um número
function calcularPercentual(numero) {
    // Recebe o número encaminhado
    let numeroPercentual = Number(numero)

    // Validação de entrada vazia, menor ou igual a 0 e de caracter
    if (numero == '' || numero <= 0 || isNaN(numero)) {
        return false
    } else {
        // Calcula o percentual do número
        let percentual = numeroPercentual / 100
        return Number(percentual.toFixed(2))
    }
}

// Função para retornar o montante referente a juros compostos
function calcularJurosCompostos(valor, taxa, parcelas) {
    // Recebe os valores dos argumentos e converte em número
    let valorPrincipal = Number(valor)
    let taxaJuros = Number(taxa)
    let qtdeParcelas = Number(parcelas)

    // Validação de vazio e de caracteres
    if (valor == '' || isNaN(valor) || valor <= 0 || parcelas == '' || isNaN(parcelas) || parcelas <= 0) {
        return false
    } else {
        // Chama a função para retornar o percentual da taxa
        let percentual = calcularPercentual(taxaJuros)

        if (percentual) {
            // Cálculo
            let montante = valorPrincipal * ((1 + percentual) ** qtdeParcelas)
            return Number(montante.toFixed(2))
        } else {
            return false
        }
    }
}

// Torna as funções públicos, fazendo com que outros arquivos possam utilizá-lo
module.exports = {
    calcularPercentual,
    calcularJurosCompostos
}