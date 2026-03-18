/*************************************************************************************************
 * Objetivo: Arquivo responsável pelas funções de busca ao arquivo de estados e cidades do Brasil.
 * Data: 18/03/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*************************************************************************************************/

let arquivo = require('./estados_cidades.js')

// Função que retorna uma lista com todas as siglas dos estados brasileiros junto com a quantidade de siglas
const getListaDeEstados = function () {
    // Criação de variáveis
    let lista = {}
    let uf = []
    let quantidade

    // Loop que lista todos os estados e seus atributos (nome, sigla, cidades e etc)
    arquivo.listaDeEstados.estados.forEach(function (itemLista) {
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

getListaDeEstados()