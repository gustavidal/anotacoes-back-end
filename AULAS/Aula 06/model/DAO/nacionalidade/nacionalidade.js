/********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do gênero cênico no banco de dados MySQL.
 * Data: 08/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
********************************************************************************************/

// Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

// Import do arquivo de configurações para acesso ao Banco de Dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Criar conexão com o Banco de Dados MySQL conforme o arquivo de configuração
const knexConnection = knex(knexDatabaseConfig.development)

const insertNacionalidade = async function (nacionalidade) {
    try {
        // Script SQL para inserção no database
        let sql = `
        insert into tbl_nacionalidade (
            nacionalidade
        ) values (
            replace("${nacionalidade.nacionalidade}", "'", "")
        );`

        // Roda o script no database
        let result = await knexConnection.raw(sql)

        // Condiciona o retorno do encaminhamento do script
        if (result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        return false
    }
}

const updateNacionalidade = async function (nacionalidade) {
    try {
        let sql = `
        update tbl_nacionalidade set
            nacionalidade = replace("${nacionalidade.nacionalidade}", "'", "")
        where id = ${nacionalidade.id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllNacionalidade = async function () {
    try {
        // Script SQL para inserção no database
        let sql = `select * from tbl_nacionalidade order by id desc;`

        // Roda o script no database
        let result = await knexConnection.raw(sql)

        // Condiciona o retorno do encaminhamento do script
        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectByIdNacionalidade = async function (id) {
    try {
        let sql = `select * from tbl_nacionalidade where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteNacionalidade = async function (id) {
    try {
        let sql = `delete from tbl_nacionalidade where id = ${id};`

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
    insertNacionalidade,
    updateNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade,
    deleteNacionalidade
}