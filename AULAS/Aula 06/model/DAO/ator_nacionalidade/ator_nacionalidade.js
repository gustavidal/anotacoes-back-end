/*****************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de relação entre ator e nacionalidade no banco de dados MySQL.
 * Data: 29/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*****************************************************************************************************************/

// Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

// Import do arquivo de configurações para acesso ao Banco de Dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Criar conexão com o Banco de Dados MySQL conforme o arquivo de configuração
const knexConnection = knex(knexDatabaseConfig.development)

const insertAtorNacionalidade = async function (atorNacionalidade) {
    try {
        // Script SQL para inserção no database
        let sql = `
        insert into tbl_ator_nacionalidade (
            id_ator,
            id_nacionalidade
        ) values (
            ${atorNacionalidade.id_ator},
            ${atorNacionalidade.id_nacionalidade}
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

const updateAtorNacionalidade = async function (atorNacionalidade) {
    try {
        let sql = `
        update tbl_ator_nacionalidade set
            id_ator          = ${atorNacionalidade.id_ator},
            id_nacionalidade = ${atorNacionalidade.id_nacionalidade}
        where id = ${atorNacionalidade.id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllAtorNacionalidade = async function () {
    try {
        // Script SQL para inserção no database
        let sql = `select * from tbl_ator_nacionalidade order by id desc;`

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

const selectByIdAtorNacionalidade = async function (id) {
    try {
        let sql = `select * from tbl_ator_nacionalidade where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectNacionalidadesByIdAtor = async function (idAtor) {
    try {
        let sql = `
        select tbl_nacionalidade.*
        from tbl_ator
            inner join tbl_ator_nacionalidade
                on tbl_ator.id = tbl_ator_nacionalidade.id_ator
            inner join tbl_nacionalidade
                on tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade
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

const selectAtoresByIdNacionalidade = async function (idNacionalidade) {
    try {
        let sql = `
        select tbl_ator.*
        from tbl_ator
            inner join tbl_ator_nacionalidade
                on tbl_ator.id = tbl_ator_nacionalidade.id_ator
            inner join tbl_nacionalidade
                on tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade
        where tbl_nacionalidade.id = ${idNacionalidade};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteAtorNacionalidade = async function (id) {
    try {
        let sql = `delete from tbl_ator_nacionalidade where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteNacionalidadesByIdAtor = async function (idAtor) {
    try {
        let sql = `delete from tbl_ator_nacionalidade where id_ator = ${idAtor};`

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
    insertAtorNacionalidade,
    updateAtorNacionalidade,
    selectAllAtorNacionalidade,
    selectByIdAtorNacionalidade,
    selectNacionalidadesByIdAtor,
    selectAtoresByIdNacionalidade,
    deleteAtorNacionalidade,
    deleteNacionalidadesByIdAtor
}