/****************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD de filme.
 * Data: 17/04/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
****************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

// Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

// Função para inserir um novo filme
const inserirNovoFilme = async function (filme) {
    // Cria uma cópia dos JSON's do arquivo de configurações de mensagens
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80) {
        customMessages.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
    } else if (filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined) {
        customMessages.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDA'
    } else if (filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 255) {
        customMessages.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDA'
    } else if (filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        customMessages.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDA'
    } else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5) {
        customMessages.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDA'
    } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5) {
        customMessages.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
    } else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        customMessages.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDA'
    } else {
        let result = await filmeDAO.insertFilme(filme)

        if (result) {
            customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_CREATED_ITEM.status
            customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
            customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_CREATED_ITEM.message
        } else {
            customMessages.DEFAULT_MESSAGE.status = customMessages.ERROR_INTERNAL_SERVER_MODEL.status
            customMessages.DEFAULT_MESSAGE.status_code = customMessages.ERROR_INTERNAL_SERVER_MODEL.status_code
            customMessages.DEFAULT_MESSAGE.message = customMessages.ERROR_INTERNAL_SERVER_MODEL.message
        }

        return customMessages.DEFAULT_MESSAGE
    }
}

// Função para atualizar um filme existente
const atualizarFilme = async function () {

}

// Função para retornar todos os filmes existentes
const listarFilme = async function () {

}

// Função para retornar um filme filtrado pelo id
const buscarFilme = async function () {

}

// Função para excluir um filme
const excluirFilme = async function () {

}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}