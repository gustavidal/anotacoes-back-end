/*************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de relação entre ator e atividade no banco de dados MySQL.
 * Data: 04/06/2026 (quinta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*************************************************************************************************************/

// Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

// Import do arquivo de configurações para acesso ao Banco de Dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Criar conexão com o Banco de Dados MySQL conforme o arquivo de configuração
const knexConnection = knex(knexDatabaseConfig.development)

const insertAtorAtividade = async function (atorAtividade) {
    try {
        // Script SQL para inserção no database
        let sql = `
        insert into tbl_ator_atividade (
            id_ator,
            id_atividade
        ) values (
            ${atorAtividade.id_ator},
            ${atorAtividade.id_atividade}
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

const updateAtorAtividade = async function (atorAtividade) {
    try {
        let sql = `
        update tbl_ator_atividade set
            id_ator      = ${atorAtividade.id_ator},
            id_atividade = ${atorAtividade.id_atividade}
        where id = ${atorAtividade.id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllAtorAtividade = async function () {
    try {
        // Script SQL para inserção no database
        let sql = `select * from tbl_ator_atividade order by id desc;`

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

const selectByIdAtorAtividade = async function (id) {
    try {
        let sql = `select * from tbl_ator_atividade where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAtividadesByIdAtor = async function (idAtor) {
    try {
        let sql = `
        select tbl_atividade.*
        from tbl_ator
            inner join tbl_ator_atividade
                on tbl_ator.id = tbl_ator_atividade.id_ator
            inner join tbl_atividade
                on tbl_atividade.id = tbl_ator_atividade.id_atividade
        where tbl_ator.id = ${idAtor};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAtoresByIdAtividade = async function (idAtividade) {
    try {
        let sql = `
        select tbl_ator.*
        from tbl_ator
            inner join tbl_ator_atividade
                on tbl_ator.id = tbl_ator_atividade.id_ator
            inner join tbl_atividade
                on tbl_atividade.id = tbl_ator_atividade.id_atividade
        where tbl_atividade.id = ${idAtividade};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteAtorAtividade = async function (id) {
    try {
        let sql = `delete from tbl_ator_atividade where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

const deleteAtividadesByIdAtor = async function (idAtor) {
    try {
        let sql = `delete from tbl_ator_atividade where id_ator = ${idAtor};`

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
    insertAtorAtividade,
    updateAtorAtividade,
    selectAllAtorAtividade,
    selectByIdAtorAtividade,
    selectAtividadesByIdAtor,
    selectAtoresByIdAtividade,
    deleteAtorAtividade,
    deleteAtividadesByIdAtor
}