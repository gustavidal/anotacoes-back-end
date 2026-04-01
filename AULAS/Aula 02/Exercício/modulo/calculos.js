/********************************************************
* Objetivo: Arquivo responsável pelas funções de cálculos
* Autor: Gustavo Vidal de Abreu
* Data: 13/02/2026 (sexta-feira)
* Versão: 1.0
********************************************************/

// Função para retornar a média aritmética de 4 valores
function calcularMedia(n1, n2, n3, n4, nome) {
    // Recebe valor das variáveis
    let nomeAluno = nome
    let nota1 = Number(n1)
    let nota2 = Number(n2)
    let nota3 = Number(n3)
    let nota4 = Number(n4)

    // Validação de entradas vazias, maiores que 100, menores que 100,
    // caso as notas não forem números e se o nome não for preenchido corretamente
    if (nomeAluno == '' || !isNaN(nomeAluno) ||
        n1 == '' || n1 < 0 || n1 > 100 || isNaN(n1) ||
        n2 == '' || n2 < 0 || n2 > 100 || isNaN(n2) ||
        n3 == '' || n3 < 0 || n3 > 100 || isNaN(n3) ||
        n4 == '' || n4 < 0 || n4 > 100 || isNaN(n4)) {
        return false
    } else {
        // Calcula a média aritmética
        let media = (nota1 + nota2 + nota3 + nota4) / 4
        return Number(media.toFixed(2))
    }
}

// Função para retornar o status de um aluno com base em sua média
function validarStatus(media) {
    let mediaAluno = media
    let status

    if (media) {
        if (mediaAluno >= 70) {
            status = "APROVADO";
        } else if (mediaAluno < 50) {
            status = "REPROVADO";
        } else {
            status = "RECUPERAÇÃO";
        }

        return status
    } else {
        return false
    }
}

// Torna as funções públicas, fazendo com que outros arquivos possam utilizá-lo
module.exports = {
    calcularMedia,
    validarStatus
}