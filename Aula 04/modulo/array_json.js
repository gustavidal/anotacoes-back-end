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

    JSON é um espaço na memória para armazenar dados com CHAVE e indice.
        Ex:
            let nome     = 'José'
            let telefone = '5511999999999'
            let email    = 'jose@gmail.com'

                            Atributo
                            Chave    indice     Chave         indice        Chave         indice
            let cliente  = {'nome': 'José', 'telefone': '5511999999999', 'email': 'jose@gmail.com'}
*/

// Criando objetos do tipo ARRAY
const listaDeAlunos = ['José', 'Maria', 'Luiz', 'Antônio', 'Carlos']
const listaDeClientes = []
const listaDeFornecedores = []

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
    while (cont < listaDeAlunos.length) {
        console.log(`O nome do aluno é: ${listaDeAlunos[cont]}`)
        cont += 1
    }

    // Usando o for
    console.log('\nExemplo com for:')
    for (let contador = 0; contador < listaDeAlunos.length; contador++) {
        console.log(`O nome do aluno é: ${listaDeAlunos[contador]}`)
    }

    // Usando o forEach
    console.log('\nExemplo com forEach:')
    listaDeAlunos.forEach(function (aluno) {
        console.log(`O nome do aluno é: ${aluno}`)
    });

    // Usando o for (--- of ---)
    console.log('\nExemplo com for (--- of ---):')
    for (aluno of listaDeAlunos) {
        console.log(`O nome do aluno é: ${aluno}`)
    }

    // Usando o for (--- in ---)
    console.log('\nExemplo com for (--- in ---):')
    for (item in listaDeAlunos) {
        console.log(`O nome do aluno é: ${listaDeAlunos[item]}`)
    }

    // Retorna a quantidade de itens em um ARRAY
    console.log('')
    console.log(listaDeAlunos.length)
}

const manipularDados = function () {
    // Adicionando elementos de forma manual pelo índice
    listaDeClientes[0] = 'José da Silva'
    listaDeClientes[1] = 'Maria da Silva'
    listaDeClientes[2] = 'Luiz da Silva'
    listaDeClientes[3] = 'Ana da Silva'

    console.log(listaDeClientes)

    // Permite adicionar novos elementos no ARRAY, sempre no final
    listaDeFornecedores.push('Antônio')
    listaDeFornecedores.push('Caio')
    listaDeFornecedores.push('Luiz')
    listaDeFornecedores.push('Hugo', 'Maria', 'José', 'André')
    console.table(listaDeFornecedores)

    // Permite adicionar novos elementos no ARRAY, sempre no início
    // Após a adição do elemento, ele reorganiza todos os outros itens
    listaDeFornecedores.unshift('Luciano')
    console.table(listaDeFornecedores)

    // Permite adicionar novos elementos em uma determinada posição do ARRAY
    //                  splice(índice, qtdeElementos, 'Conteúdo novo')
    listaDeFornecedores.splice(3, 0, 'Bernardo')
    console.table(listaDeFornecedores)

    // Permite remover um determinado elemento, com base no índice do ARRAY
    //                  splice(índice, qtdeRemocao)
    listaDeFornecedores.splice(6, 1)
    console.table(listaDeFornecedores)

    // Permite remover o último elemento de um ARRAY
    listaDeFornecedores.pop()
    console.table(listaDeFornecedores)

    // Permite remover o primeiro elemento de um ARRAY
    // Após a remoção, os itens são reorganizados
    listaDeFornecedores.shift()
    console.table(listaDeFornecedores)
}

const removerNome = function (nome) {
    //                          VERSÃO COM INDEX OF
    // indexOf -> Retorna o índice referente ao conteúdo que esta sendo pesquisado
    listaDeAlunos.splice(listaDeAlunos.indexOf(nome), 1)

    //                            VERSÃO COM FOR
    // for (indice = 0; listaDeAlunos[indice] !== nome; indice++) { }
    // if (listaDeAlunos[indice] === nome)
    //     listaDeAlunos.splice(indice, 1)

    //                       VERSÃO COM FOR (-- IN --)
    // for (indice in listaDeAlunos)
    //     if (nome === listaDeAlunos[indice])
    //         listaDeAlunos.splice(indice, 1)

    console.table(listaDeAlunos)
}

const verificarItem = function (nome) {
    // .includes -> Verifica se um elemento existe dentro de um ARRAY, retornando true ou false
    console.log(listaDeAlunos.includes(nome))
}

const manipularDadosJSON = function () {
    // A estrutura do JSON é Chave (atributo) : Valor (conteúdo)
    let aluno = { "id": 1, "nome": "José da Silva", "ra": 28374, "email": "jose@gmail.com" }

    // Exibe o objeto JSON
    console.log(aluno)
    console.table(aluno)

    // Exibe um valor de atributo específico
    console.log(aluno.nome)
    console.log(aluno.email)

    // Adiciona um novo atributo em um JSON existente
    aluno.telefone = "11999999999"
    aluno.data_nascimento = "01/01/2000"
    console.log(aluno)

    // Remove um atributo existente em um JSON existente
    delete aluno.email
    console.log(aluno)

    // Renomeia um atributo existente
    aluno.ra = 98423
    console.log(aluno)

    // Cria um atributo para uso posterior
    aluno.nota = null
    console.log(aluno)
}

const cadastroDeProdutos = function () {
    let cores = [
        { "id": 1, "cor": "Branco", "hexadecimal": "#ffffff" },
        { "id": 2, "cor": "Preto", "hexadecimal": "#000000" },
        { "id": 3, "cor": "Azul", "hexadecimal": "#0000ff" },
        { "id": 4, "cor": "Amarelo", "hexadecimal": "#ffff00" },
        { "id": 5, "cor": "Rosa", "hexadecimal": "#ffb5c0" },
    ]

    for (let indice = 0; indice < cores.length; indice++)
        console.log(cores[indice].cor)
}


// exibirDados()
// manipularDados()
// removerNome('Maria')
// verificarItem('José')
// manipularDadosJSON()
cadastroDeProdutos()