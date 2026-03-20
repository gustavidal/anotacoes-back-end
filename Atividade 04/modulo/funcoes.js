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
    let lista = {
        "uf":        siglaEstado.toUpperCase(),
        "descricao": false,
        "capital":   false,
        "regiao":    false
    }
    
    // Pega cada estado da lista de estados
    for (let estado of ESTADOS) {
        // Verifica se encontrou o estado
        if (estado.sigla === siglaEstado.toUpperCase()) {
            // Retorna o JSON de resposta
            lista.uf        = estado.sigla
            lista.descricao = estado.nome,
            lista.capital   = estado.capital,
            lista.regiao    = estado.regiao
        }
    }

    if (lista.descricao == false)
        return false

    return lista
}

// Função que retorna apenas capital do estado
const getCapitalEstado = function (siglaEstado) {
    let lista = {
        "uf":        siglaEstado.toUpperCase(),
        "descricao": false,
        "capital":   false
    }

    // Pega cada estado da lista de estados
    for (let estado of ESTADOS) {
        // Verifica se encontrou o estado
        if (estado.sigla === siglaEstado.toUpperCase()) {
            // Retorna o JSON de resposta
            lista.descricao = estado.nome
            lista.capital   = estado.capital
        }
    }

    if (lista.descricao == false)
        return false

    return lista
}

// Função que retorna todos os estados de uma região do Brasil
const getEstadosRegiao = function (regiaoEstados) {
    let lista = {
        "regiao":  regiaoEstados.toUpperCase(),
        "estados": []
    }

    // Percorre todos os estados
    for (let estado of ESTADOS) {
        // Verifica se o estado pertence a região
        if (estado.regiao.toUpperCase() === regiaoEstados.toUpperCase()) {
            // Adiciona o estado a lista de resposta
            lista.estados.push({
                "uf":        estado.sigla,
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
    ESTADOS.forEach(function (itemEstado) {
        // Caso algum estado tenha o atributo de capital do país
        if (itemEstado.capital_pais) {
            // Adiciona as informações ao array das capitais
            lista.capitais.push({
                "capital_atual":            itemEstado.capital_pais.capital,
                "uf":                       itemEstado.sigla,
                "descricao":                itemEstado.nome,
                "capital":                  itemEstado.capital,
                "regiao":                   itemEstado.regiao,
                "capital_pais_ano_inicio":  itemEstado.capital_pais.ano_inicio,
                "capital_pais_ano_termino": itemEstado.capital_pais.ano_fim
            })
        }
    })

    return lista
}

// Função que retorna todas as cidades de um estado
const getCidades = function (siglaEstado) {
    let lista = {
        "uf":         siglaEstado.toUpperCase(),
        "descricao":  false,
        "quantidade": false,
        "cidades":    []
    }

    // Percorre os estados
    for (let estado of ESTADOS) {
        // Caso as siglas forem iguais
        if (estado.sigla.toUpperCase() === siglaEstado.toUpperCase()) {
            lista.descricao = estado.nome

            // Percorre as cidades do estado informado
            estado.cidades.forEach(function (itemCidade) {
                // Adiciona as cidades ao array
                lista.cidades.push(itemCidade.nome)
            })
        }
    }
    
    // Valida caso não foi encontrado nenhuma cidade
    if (lista.cidades.length == 0)
        return false
    
    // Define a quantidade de cidades do estado
    lista.quantidade = lista.cidades.length

    return lista
}