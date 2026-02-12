function calcularMedia(n1, n2, n3, n4, nome) {
    let nomeAluno = nome
    let nota1 = Number(n1)
    let nota2 = Number(n2)
    let nota3 = Number(n3)
    let nota4 = Number(n4)

    if (nomeAluno == '' || !isNaN(nomeAluno) ||
        n1 == '' || n1 < 0 || n1 > 100 || isNaN(n1) ||
        n2 == '' || n2 < 0 || n2 > 100 || isNaN(n2) ||
        n3 == '' || n3 < 0 || n3 > 100 || isNaN(n3) ||
        n4 == '' || n4 < 0 || n4 > 100 || isNaN(n4)) {
        return false
    } else {
        let media = (nota1 + nota2 + nota3 + nota4) / 4
        return Number(media.toFixed(2))
    }
}

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

// Torna as funções públicos, fazendo com que outros arquivos possam utilizá-lo
module.exports = {
    calcularMedia,
    validarStatus
}