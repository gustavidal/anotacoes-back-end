/*************************************************************************************************
 * Objetivo: Arquivo responsável pelas funções de busca ao arquivo de estados e cidades do Brasil.
 * Data: 18/03/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*************************************************************************************************/

'use strict'

let arquivo = require('./estados_cidades.js')

const listaDeEstados = arquivo.listaDeEstados
const ESTADOS        = listaDeEstados.estados

// Função que retorna a lista de siglas dos estados
const getListaDeEstados = function () {
    let lista = {}
    let uf    = []

    for (let i = 0; i < ESTADOS.length; i++) {
        uf.push(ESTADOS[i].sigla)
    }

    lista.uf = uf
    lista.quantidade = uf.length

    return lista
}

// Função que retorna os dados completos de um estado
const getDadosEstado = function (siglaEstado) {
    
    // Pega cada estado da lista de estados
    for (let estado of ESTADOS) {
        // Verifica se encontrou o estado
        if (estado.sigla === siglaEstado.toUpperCase()) {
            // Retorna o JSON de resposta
            return {
                uf:        estado.sigla,
                descricao: estado.nome,
                capital:   estado.capital,
                regiao:    estado.regiao
            }
        }
    }

    // Caso não encontre o estado
    return false
}

// Função que retorna apenas capital do estado
const getCapitalEstado = function (siglaEstado) {

    // Pega cada estado da lista de estados
    for (let estado of ESTADOS) {
        // Verifica se encontrou o estado
        if (estado.sigla == siglaEstado.toUpperCase()) {
            // Retorna o JSON de resposta
            return {
                uf:        estado.sigla,
                descricao: estado.nome,
                capital:   estado.capital,
            }
        }
    }

    // Caso não encontre o estado
    return false
}

const getEstadosRegiao = function (regiaoEstadual) {
    let lista = {
        regiao: regiaoEstadual.toUpperCase(),
        estados: []
    }

    // Percorre todos os estados
    for (let estado of ESTADOS) {
        // Verifica se o estado pertence a região
        if (estado.regiao.toUpperCase() ==! regiaoEstadual.toUpperCase()) {
            return false
            // Adiciona o estado a lista de resposta
        } else {
            lista.estados.push({
                uf:        estado.sigla,
                descricao: estado.nome
            })
        }
    }

    return lista
}

const getCapitalPais = function () {
    let lista = {
        capitais: []
    }

    ESTADOS.forEach(function (estado) {
        if (estado.capital_pais) {
            lista.capitais.push({
                capital_atual: estado.capital_pais.capital,
                uf: estado.sigla,
                descricao: estado.nome,
                capital: estado.capital,
                capital_pais_ano_inicio: estado.capital_pais.ano_inicio,
                capital_pais_ano_termino: estado.capital_pais.ano_fim
            })
        }
    })

    return lista
}

console.log(getListaDeEstados())
console.log(getDadosEstado('ac'))
console.log(getCapitalEstado('am'))
console.log(getEstadosRegiao('sudeste'))
console.log(getCapitalPais())