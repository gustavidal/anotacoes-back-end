/************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do filme no banco de dados MySQL.
 * Data: 15/04/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
************************************************************************************/

// Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

// Import do arquivo de configurações para acesso ao Banco de Dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Criar conexão com o Banco de Dados MySQL conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

// Função para inserir um novo filme no banco de dados
const insertFilme = async function (filme) {
    try {
        let sql = `insert into tbl_filme (
            nome,
            sinopse,
            capa,
            data_lancamento,
            duracao,
            valor,
            avaliacao
        ) values (
            '${filme.nome}',
            '${filme.sinopse}',
            '${filme.capa}',
            '${filme.data_lancamento}',
            '${filme.duracao}',
            '${filme.valor}',
            if('${filme.avaliacao}' = '', null, '${filme.avaliacao}')
        );`

        // Encaminha o scriptSQL para o Banco de Dados
        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

// Função para atualizar um filme existente no banco de dados
const updateFilme = async function (filme) {

}

// Função para retornar todos os dados de filme do banco de dados
const selectAllFilme = async function () {

}

// Função para retornar um filme filtrado pelo id
const selectByIdFilme = async function (id) {

}

// Função para excluir um filme filtrado pelo id
const deleteFilme = async function (id) {

}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}