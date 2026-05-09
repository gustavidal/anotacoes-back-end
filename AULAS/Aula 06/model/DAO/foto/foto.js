/********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da foto no banco de dados MySQL.
 * Data: 09/05/2026 (sábado)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
********************************************************************************************/

// Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

// Import do arquivo de configurações para acesso ao Banco de Dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Criar conexão com o Banco de Dados MySQL conforme o arquivo de configuração
const knexConnection = knex(knexDatabaseConfig.development)

const insertFoto = async function (foto) {
    try {
        // Script SQL para inserção no database
        let sql = `
        insert into tbl_foto (
            foto
        ) values (
            replace("${foto.foto}", "'", "")
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

const updateFoto = async function (foto) {
    try {
        let sql = `
        update tbl_foto set
            foto = replace("${foto.foto}", "'", "")
        where id = ${foto.id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllFoto = async function () {
    try {
        // Script SQL para inserção no database
        let sql = `select * from tbl_foto order by id desc;`

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

const selectByIdFoto = async function (id) {
    try {
        let sql = `select * from tbl_foto where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteFoto = async function (id) {
    try {
        let sql = `delete from tbl_foto where id = ${id};`

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
    insertFoto,
    updateFoto,
    selectAllFoto,
    selectByIdFoto,
    deleteFoto
}