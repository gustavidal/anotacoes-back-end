/***********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do sexo no banco de dados MySQL.
 * Data: 13/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
***********************************************************************************/

// Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

// Import do arquivo de configurações para acesso ao Banco de Dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Criar conexão com o Banco de Dados MySQL conforme o arquivo de configuração
const knexConnection = knex(knexDatabaseConfig.development)

// Função para inserir um novo sexo no banco de dados
const insertSexo = async function (sexo) {
    try {
        let sql = `
        insert into tbl_sexo (
            sigla,
            sexo
        ) values (
            replace("${sexo.sigla}", "'", ""),
            replace("${sexo.sexo}", "'", "")
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

const updateSexo = async function (sexo) {
    try {
        let sql = `
        update tbl_sexo set
            sigla = replace("${sexo.sigla}", "'", ""),
            sexo  = replace("${sexo.sexo}", "'", "")
        where id = ${sexo.id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllSexo = async function () {
    try {
        let sql = `select * from tbl_sexo order by id desc;`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false   
    }
}

const selectByIdSexo = async function (id) {
    try {
        let sql = `select * from tbl_sexo where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteSexo = async function (id) {
    try {
        let sql = `delete from tbl_sexo where id = ${id};`

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
    insertSexo,
    updateSexo,
    selectAllSexo,
    selectByIdSexo,
    deleteSexo
}