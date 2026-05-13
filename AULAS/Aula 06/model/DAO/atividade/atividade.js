/*****************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da atividade profissional no banco de dados MySQL.
 * Data: 13/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*****************************************************************************************************/

// Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

// Import do arquivo de configurações para acesso ao Banco de Dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Criar conexão com o Banco de Dados MySQL conforme o arquivo de configuração
const knexConnection = knex(knexDatabaseConfig.development)

// Função para inserir uma nova atividade profissional no banco de dados
const insertAtividade = async function (atividade) {
    try {
        let sql = `
        insert into tbl_atividade (
            area_atuacao
        ) values (
            replace("${atividade.area_atuacao}", "'", "")
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

const updateAtividade = async function (atividade) {
    try {
        let sql = `
        update tbl_atividade set
            area_atuacao = replace("${atividade.area_atuacao}", "'", "")
        where id = ${atividade.id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllAtividade = async function () {
    try {
        let sql = `select * from tbl_atividade order by id desc;`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false   
    }
}

const selectByIdAtividade = async function (id) {
    try {
        let sql = `select * from tbl_atividade where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteAtividade = async function (id) {
    try {
        let sql = `delete from tbl_atividade where id = ${id};`

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
    insertAtividade,
    updateAtividade,
    selectAllAtividade,
    selectByIdAtividade,
    deleteAtividade
}