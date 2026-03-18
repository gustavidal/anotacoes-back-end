/*************************************************************************************************
 * Objetivo: Arquivo responsável pelas funções de busca ao arquivo de estados e cidades do Brasil.
 * Data: 18/03/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*************************************************************************************************/

let arquivo = require('./estados_cidades.js')

const listaDeEstados = arquivo.listaDeEstados
const ESTADOS = listaDeEstados.estados

// Função que retorna uma lista com todas as siglas dos estados brasileiros junto com a quantidade de siglas
const getListaDeEstados = function () {
    // Criação de variáveis
    let lista = {}
    let uf = []
    let quantidade

    // Loop que lista todos os estados e seus atributos (nome, sigla, cidades e etc)
    ESTADOS.forEach(function (itemLista) {
        // Adiciona TODAS e SOMENTE as siglas dos estados brasileiros
        uf.push(itemLista.sigla)
    })

    // Define a quantidade de itens em uma mesma variável
    quantidade = uf.length

    // Adiciona atributos a um JSON
    lista.uf = uf
    lista.quantidade = quantidade

    // Retorna a lista final
    return lista
}

// Função que retorna uma lista com os dados do estado, como nome, sigla, capital e região, a partir da sigla do estado
const getDadosEstados = function (siglaEstado) {
    // Criação de variáveis
    let lista = {}
    let siglas = getListaDeEstados()

    // Loop que percorre a lista de siglas dos estados brasileiros
    siglas.uf.forEach(function (itemSigla) {
        // Verifica se a sigla passada como parâmetro é igual a alguma das siglas da lista de siglas dos estados brasileiros, caso seja, adiciona os dados do estado a um JSON, caso contrário, retorna false
        if (itemSigla == siglaEstado.toUpperCase()) {
            // Adiciona a sigla do estado a um JSON
            lista.uf = itemSigla

            // Loop que percorre a lista de estados brasileiros
            ESTADOS.forEach(function (itemLista) {
                // Verifica se a sigla do estado é igual a sigla passada como parâmetro, caso seja, adiciona os dados do estado a um JSON
                if (itemLista.sigla == itemSigla) {
                    // Adiciona os dados do estado a um JSON
                    lista.descricao = itemLista.nome
                    lista.capital = itemLista.capital
                    lista.regiao = itemLista.regiao
                }
            })
        } else {
            return false
        }
    })

    // Retorna a lista final
    return lista
}

// Função que retorna uma lista com os dados do estado, como nome, sigla e capital, a partir da sigla do estado
const getCapitalEstado = function (siglaEstado) {
    // Criação de variáveis
    let lista = {}
    let siglas = getListaDeEstados()

    // Loop que percorre a lista de siglas dos estados brasileiros
    siglas.uf.forEach(function (itemSigla) {
        // Verifica se a sigla passada como parâmetro é igual a alguma das siglas da lista de siglas dos estados brasileiros, caso seja, adiciona os dados do estado a um JSON, caso contrário, retorna false
        if (itemSigla == siglaEstado.toUpperCase()) {
            // Adiciona a sigla do estado a um JSON
            lista.uf = itemSigla

            // Loop que percorre a lista de estados brasileiros
            ESTADOS.forEach(function (itemLista) {
                // Verifica se a sigla do estado é igual a sigla passada como parâmetro, caso seja, adiciona os dados do estado a um JSON
                if (itemLista.sigla == itemSigla) {
                    // Adiciona os dados do estado a um JSON
                    lista.descricao = itemLista.nome
                    lista.capital = itemLista.capital
                }
            })
        } else {
            return false
        }
    })

    // Retorna a lista final
    return lista
}