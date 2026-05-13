/*******************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da classificação indicativa no banco de dados MySQL.
 * Data: 13/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*******************************************************************************************************/

// Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

// Import do arquivo de configurações para acesso ao Banco de Dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Criar conexão com o Banco de Dados MySQL conforme o arquivo de configuração
const knexConnection = knex(knexDatabaseConfig.development)

// Função para inserir uma nova classificação indicativa no banco de dados
const insertClassificacao = async function (classificacao) {
    try {
        let sql = `
        insert into tbl_classificacao (
            classificacao,
            descricao,
            idade_minima
        ) values (
            replace("${classificacao.classificacao}", "'", ""),
            if('${classificacao.descricao}' = '', null, replace("${classificacao.descricao}", "'", "")),
            if('${classificacao.idade_minima}' = '', 0, replace("${classificacao.idade_minima}", "'", ""))
        );`

        let result = await knexConnection.raw(sql)

        if (result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        return false
    }
}

const updateClassificacao = async function (classificacao) {
    try {
        let sql = `
        update tbl_classificacao set
            classificacao = replace("${classificacao.classificacao}", "'", ""),
            descricao     = replace("${classificacao.descricao}", "'", ""),
            idade_minima  = replace("${classificacao.idade_minima}", "'", "")
        where id = ${classificacao.id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllClassificacao = async function () {
    try {
        let sql = `select * from tbl_classificacao order by id desc;`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectByIdClassificacao = async function (id) {
    try {
        let sql = `select * from tbl_classificacao where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteClassificacao = async function (id) {
    try {
        let sql = `delete from tbl_classificacao where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertClassificacao,
    updateClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    deleteClassificacao
}