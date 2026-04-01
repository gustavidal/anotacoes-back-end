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
        sexo = 'O aluno'
    else
        sexo = 'A aluna'

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

// Função que classifica a média recuperativa do aluno de acordo com a nota
const formatarMediaRecuperativa = function (media) {
    let mediaNum = Number(media)
    let situacao = ''

    if (mediaNum >= 60)
        situacao = 'aprovado'
    else
        situacao = 'reprovado'

    return situacao
}

// Função que formata de forma completa a saída formatada da média com todos os valores pedidos nos requisitos
const formatarSaidaMedia = function (
    situacao, situacaoExame, media, mediaExame,
    curso, disciplina,
    nomeProf, nomeAluno, genProf, genAluno,
    nota1, nota2, nota3, nota4, notaExame
) {        
    let situacaoInf   = String(situacao)
    let situacaoEx    = String(situacaoExame)
    let mediaFinal    = Number(media)
    let mediaRec      = Number(mediaExame)
    let cursoInf      = String(curso)
    let disciplinaInf = String(disciplina)
    let nomeProfInf   = String(nomeProf)
    let nomeAlunoInf  = String(nomeAluno)
    let genProfInf    = String(genProf)
    let genAlunoInf   = String(genAluno)
    let nota1Inf      = Number(nota1)
    let nota2Inf      = Number(nota2)
    let nota3Inf      = Number(nota3)
    let nota4Inf      = Number(nota4)
    let notaRec       = Number(notaExame)
    let texto         = ''
    
    if (situacaoInf === 'recuperação')
        texto += `\n${genAlunoInf} ${nomeAlunoInf} foi ${situacaoEx} na disciplina ${disciplinaInf}.`
    else
        texto += `\n${genAlunoInf} ${nomeAlunoInf} foi ${situacaoInf} na disciplina ${disciplinaInf}.`
    
    texto += `\nCurso: ${cursoInf}`
    texto += `\n${genProfInf}: ${nomeProfInf}`

    if (situacaoInf === 'recuperação')
        texto += `\nNotas: ${nota1Inf}, ${nota2Inf}, ${nota3Inf}, ${nota4Inf} e ${notaRec}.`
    else
        texto += `\nNotas: ${nota1Inf}, ${nota2Inf}, ${nota3Inf} e ${nota4Inf}.`
    
    texto += `\nMédia final: ${mediaFinal}`

    if (situacaoInf === 'recuperação')
        texto += `\nMédia final do exame: ${mediaRec}`

    return texto
}



// FUNÇÕES PARA A TABUADA
// Função que calcula a tabuada
const formatarTabuada = function (tabuadaInicial, tabuadaFinal, contador, contadorFinal) {
    let tabIni    = Number(tabuadaInicial)
    let tabFim    = Number(tabuadaFinal)
    let contIni   = Number(contador)
    let contFim   = Number(contadorFinal)
    let resultado = ''

    for (let i = tabIni; i <= tabFim; i++) {
        resultado += `\nTabuada do [${i}]\n`

        for (let j = contIni; j <= contFim; j++)
            resultado += `${i} × ${j} = ${multiplicar(i, j)}\n`
    }

    return resultado
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
    let tituloFormat = titulo.trim().toUpperCase()
    let retorno      = String(retornoCalculo)
    let partes       = retorno.split('|')
    let lista        = partes[0]
    let quantidade   = partes[1]
    let texto        = `\n${tituloFormat}\n`
    
    texto += lista
    texto += `Quantidade de números encontrados: ${quantidade}\n`

    return texto
}

const formatarSaidaParImpar = function (tipo, tPar, tImpar) {
    let tipoSaida    = String(tipo.trim().toUpperCase())
    let textoPares   = String(tPar)
    let textoImpares = String(tImpar)
    let texto        = ''
    
    if (tipoSaida === 'PARES' || tipoSaida === 'PAR') {
        texto += `${textoPares}`
    } else if (tipoSaida === 'ÍMPARES' || tipoSaida === 'ÍMPAR' || tipoSaida === 'IMPARES' || tipoSaida === 'IMPAR') {
        texto += `${textoImpares}`
    } else if (tipoSaida === 'AMBOS' || tipoSaida === 'OS DOIS') {
        texto += `${textoPares}\n`
        texto += `${textoImpares}`
    } else {
        texto += '\nOpção inválida!'
    }

    return texto
}



// Exportação das funções
module.exports = {
    // Padrões
    formatarTipoDeCalculadora,

    // Específicas
    formatarClassificacaoImc,
    formatarGeneroProfessor, formatarGeneroAluno, formatarMediaFinal, formatarMediaRecuperativa, formatarSaidaMedia,
    formatarTabuada,
    formatarExpressaoFatorial,
    formatarListaParesImpares, formatarSaidaParImpar
}