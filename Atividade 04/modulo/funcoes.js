/*************************************************************************************************
 * Objetivo: Arquivo responsável pelas funções de busca ao arquivo de estados e cidades do Brasil.
 * Data: 18/03/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*************************************************************************************************/

'use strict'

let arquivo = require('./estados_cidades.js')

const listaDeEstados = arquivo.listaDeEstados
const ESTADOS = listaDeEstados.estados

// Função que retorna a lista de siglas dos estados
const getListaDeEstados = function () {
    let lista = {}
    let uf = []

    for (let i = 0; i < ESTADOS.length; i++) {
        uf.push(ESTADOS[i].sigla)
    }

    lista.uf = uf
    lista.quantidade = uf.length

    return lista
}

// Função que retorna os dados completos de um estado
const getDadosEstados = function (siglaEstado) {
    if (!siglaEstado)
        return false

    let lista = {}
    let sigla = siglaEstado.toUpperCase()

    for (let i = 0; i < ESTADOS.length; i++) {
        if (ESTADOS[i].sigla == sigla) {
            lista.uf = ESTADOS[i].sigla
            lista.descricao = ESTADOS[i].nome
            lista.capital = ESTADOS[i].capital
            lista.regiao = ESTADOS[i].regiao
            break
        }
    }

    return lista
}

// Função que retorna apenas capital do estado
const getCapitalEstado = function (siglaEstado) {
    if (!siglaEstado)
        return false

    let lista = {}
    let sigla = siglaEstado.toUpperCase()

    for (let i = 0; i < ESTADOS.length; i++) {
        if (ESTADOS[i].sigla == sigla) {
            lista.uf = ESTADOS[i].sigla
            lista.descricao = ESTADOS[i].nome
            lista.capital = ESTADOS[i].capital
            break
        }
    }

    return lista
}

console.log(getListaDeEstados())
console.log(getDadosEstados('SP'))
console.log(getCapitalEstado('SP'))