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

const getDadosEstados = function (siglaEstado) {
    let lista = {}
    let siglas = getListaDeEstados()

    siglas.uf.forEach(function (itemSigla) {
        if (itemSigla == siglaEstado.toUpperCase()) {
            lista.uf = itemSigla
            
            ESTADOS.forEach(function (itemLista) {
                if (itemLista.sigla == itemSigla) {
                    lista.descricao = itemLista.nome
                    lista.capital = itemLista.capital
                    lista.regiao = itemLista.regiao
                }
            })
        } else {
            return false
        }
    })

    return lista
}

// getListaDeEstados()
getDadosEstados('mg')