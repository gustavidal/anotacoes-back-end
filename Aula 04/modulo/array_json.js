/********************************************
 * Objetivo: Manipular dados em ARRAY e JSON
 * Data: 05/03/2026 (quinta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
********************************************/

/*
    [] -> representa um objeto do tipo ARRAY
    {} -> representa um objeto do tipo JSON

    Array é um espaço na memória para armazenar dados sem a necessidade de criar outros objetos.
        Ex:
            let nome  = 'José'
            let nome2 = 'Maria'
            let nome3 = 'João'

                Índices    0        1       2
            let nomes = ['José', 'Maria', 'João']

    JSON é um espaço na memória para armazenar dados com CHAVE e VALOR.
        Ex:
            let nome     = 'José'
            let telefone = '5511999999999'
            let email    = 'jose@gmail.com'

                            Atributo
                            Chave    Valor     Chave         Valor        Chave         Valor
            let cliente  = {"nome": "José", "telefone": "5511999999999", "email": "jose@gmail.com"}
*/

// Criando objetos do tipo ARRAY
const listaDeAlunos = ['José', 'Maria', 'Luiz', 'Antônio', 'Carlos']
const listaDeClientes = []

const exibirDados = function () {
    // Exibe o objeto ARRAY com o seu conteúdo
    console.log(listaDeAlunos)

    // Exibe o tipo de dados de um índice
    console.log(typeof (listaDeAlunos[2]))

    // Exibe o objeto ARRAY em formato de tabela, mostrando índice e conteúdo
    console.table(listaDeAlunos)

    console.log(listaDeAlunos[3])
    console.log(listaDeAlunos[0])

    console.log(`O nome do aluno é: ${listaDeAlunos[0]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[1]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[2]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[3]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[4]}`)

    // Usando o while
    console.log('\nExemplo com while:')
    let cont = 0
    while (cont < 5) {
        console.log(`O nome do aluno é: ${listaDeAlunos[cont]}`)
        cont += 1
    }

    // Usando o for
    console.log('\nExemplo com for:')
    for (let contador = 0; contador < 5; contador++) {
        console.log(`O nome do aluno é: ${listaDeAlunos[contador]}`)
    }
    
    // Usando o forEach
    console.log('\nExemplo com forEach:')
    listaDeAlunos.forEach(function (aluno) {
        console.log(`O nome do aluno é: ${aluno}`)
    });
}

exibirDados()