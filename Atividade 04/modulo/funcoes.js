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
    // Validação de entrada
    if (!siglaEstado)
        return false
    
    let sigla = siglaEstado.toUpperCase()
    
    // Pega cada estado da lista de estados
    for (let estado of ESTADOS) {
        // Verifica se encontrou o estado
        if (estado.sigla == sigla) {
            // Retorna o JSON de resposta
            return {
                uf: estado.sigla,
                descricao: estado.nome,
                capital: estado.capital,
                regiao: estado.regiao
            }
        }
    }

    // Caso não encontre o estado
    return false
}

// Função que retorna apenas capital do estado
const getCapitalEstado = function (siglaEstado) {
    // Validação de entrada
    if (!siglaEstado)
        return false

    let sigla = siglaEstado.toUpperCase()

    // Pega cada estado da lista de estados
    for (let estado of ESTADOS) {
        // Verifica se encontrou o estado
        if (estado.sigla == sigla) {
            // Retorna o JSON de resposta
            return {
                uf: estado.sigla,
                descricao: estado.nome,
                capital: estado.capital,
            }
        }
    }

    // Caso não encontre o estado
    return false
}

const getEstadosRegiao = function (regiaoEstados) {
    // Validação de entrada
    if (!regiaoEstados)
        return false

    let regiao = regiaoEstados.toUpperCase()
    let lista = {
        regiao: regiao,
        estados: []
    }

    // Percorre todos os estados
    for (let estado of ESTADOS) {
        // Verifica se o estado pertence a região
        if (estado.regiao.toUpperCase() == regiao) {
            // Adiciona o estado a lista de resposta
            lista.estados.push({
                uf: estado.sigla,
                descricao: estado.nome
            })
        }
    }

    // Se não encontrou nenhum estado
    if (lista.estados.length == 0)
        return false

    return lista
}

console.log(getListaDeEstados())
console.log(getDadosEstados('rs'))
console.log(getCapitalEstado('am'))
console.log(getEstadosRegiao('sudeste'))