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

const insertGenero = async function (genero) {
    try {
        // Script SQL para inserção no database
        let sql = `
        insert into tbl_genero (
            genero
        ) values (
            replace("${genero.genero}", "'", "")
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

const updateGenero = async function (genero) {
    try {
        let sql = `
        update tbl_genero set
            genero = replace("${genero.genero}", "'", "")
        where id = ${genero.id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllGenero = async function () {
    try {
        // Script SQL para inserção no database
        let sql = `select * from tbl_genero order by id desc;`

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

const selectByIdGenero = async function (id) {
    try {
        let sql = `select * from tbl_genero where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteGenero = async function (id) {
    try {
        let sql = `delete from tbl_genero where id = ${id};`

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
    insertGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    deleteGenero
}