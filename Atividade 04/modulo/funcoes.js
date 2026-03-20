/*************************************************************************************************
 * Objetivo: Arquivo responsável pelas funções de busca ao arquivo de estados e cidades do Brasil.
 * Data: 18/03/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*************************************************************************************************/

let arquivo = require('./estados_cidades.js')
const ESTADOS = arquivo.listaDeEstados.estados

// Função que retorna a lista de siglas dos estados
const getListaDeEstados = function () {
    let lista = {
        "uf": []
    }

    // Percorre todos os estados
    for (let i = 0; i < ESTADOS.length; i++) {
        // Adiciona as informações em um array 
        lista.uf.push(ESTADOS[i].sigla)
    }
    
    // Adiciona os dados na lista
    lista.quantidade = lista.uf.length

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
                "uf":        estado.sigla,
                "descricao": estado.nome,
                "capital":   estado.capital,
                "regiao":    estado.regiao
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
        if (estado.sigla === siglaEstado.toUpperCase()) {
            // Retorna o JSON de resposta
            return {
                "uf":        estado.sigla,
                "descricao": estado.nome,
                "capital":   estado.capital,
            }
        }
    }

    // Caso não encontre o estado
    return false
}

// Função que retorna todos os estados de uma região do Brasil
const getEstadosRegiao = function (regiaoEstados) {
    let lista = {
        "regiao": regiaoEstados.toUpperCase(),
        "estados": []
    }

    // Percorre todos os estados
    for (let estado of ESTADOS) {
        // Verifica se o estado pertence a região
        if (estado.regiao.toUpperCase() === regiaoEstados.toUpperCase()) {
            // Adiciona o estado a lista de resposta
            lista.estados.push({
                "uf": estado.sigla,
                "descricao": estado.nome
            })
        }
    }

    // Se não encontrou nenhum estado
    if (lista.estados.length == 0)
        return false

    return lista
}

// Função que retorna informações sobre todas as cidades que já foram capitais do Brasil
const getCapitalPais = function () {
    let lista = {
        "capitais": []
    }

    // Percorre o arquivo
    ESTADOS.forEach(function (estado) {
        // Caso algum estado tenha o atributo de capital do país
        if (estado.capital_pais) {
            // Adiciona as informações ao array das capitais
            lista.capitais.push({
                "capital_atual": estado.capital_pais.capital,
                "uf": estado.sigla,
                "descricao": estado.nome,
                "capital": estado.capital,
                "capital_pais_ano_inicio": estado.capital_pais.ano_inicio,
                "capital_pais_ano_termino": estado.capital_pais.ano_fim
            })
        }
    })

    return lista
}

const getCidades = function (siglaEstado) {
    let lista = {
        "uf": siglaEstado.toUpperCase(),
        "descricao": false,
        "quantidade": false,
        "cidades": []
    }

    for (let estado of ESTADOS) {
        if (estado.sigla.toUpperCase() === siglaEstado.toUpperCase()) {
            lista.descricao = estado.nome
            lista.quantidade
            estado.cidades.forEach(function (itemCidade) {
                lista.cidades.push(itemCidade.nome)
            })
            lista.quantidade = lista.cidades.length
        }

    }

    if (lista.cidades.length == 0)
        return false

    return lista
}