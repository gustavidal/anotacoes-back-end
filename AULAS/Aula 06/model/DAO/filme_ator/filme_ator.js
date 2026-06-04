/*********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de relação entre filme e ator no banco de dados MySQL.
 * Data: 22/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*********************************************************************************************************/

// Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

// Import do arquivo de configurações para acesso ao Banco de Dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Criar conexão com o Banco de Dados MySQL conforme o arquivo de configuração
const knexConnection = knex(knexDatabaseConfig.development)

const insertFilmeAtor = async function (filmeAtor) {
    try {
        // Script SQL para inserção no database
        let sql = `
        insert into tbl_filme_ator (
            id_filme,
            id_ator
        ) values (
            ${filmeAtor.id_filme},
            ${filmeAtor.id_ator}
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

const updateFilmeAtor = async function (filmeAtor) {
    try {
        let sql = `
        update tbl_filme_ator set
            id_filme  = ${filmeAtor.id_filme},
            id_ator = ${filmeAtor.id_ator}
        where id = ${filmeAtor.id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllFilmeAtor = async function () {
    try {
        // Script SQL para inserção no database
        let sql = `select * from tbl_filme_ator order by id desc;`

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

const selectByIdFilmeAtor = async function (id) {
    try {
        let sql = `select * from tbl_filme_ator where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAtoresByIdFilme = async function (idFilme) {
    try {
        let sql = `
        select tbl_ator.*
        from tbl_filme
            inner join tbl_filme_ator
                on tbl_filme.id = tbl_filme_ator.id_filme
            inner join tbl_ator
                on tbl_ator.id = tbl_filme_ator.id_ator
        where tbl_filme.id = ${idFilme};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectFilmesByIdAtor = async function (idAtor) {
    try {
        let sql = `
        select tbl_filme.*
        from tbl_filme
            inner join tbl_filme_ator
                on tbl_filme.id = tbl_filme_ator.id_filme
            inner join tbl_ator
                on tbl_ator.id = tbl_filme_ator.id_ator
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

const deleteFilmeAtor = async function (id) {
    try {
        let sql = `delete from tbl_filme_ator where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

const deleteAtoresByIdFilme = async function (idFilme) {
    try {
        let sql = `delete from tbl_filme_ator where id_filme = ${idFilme};`

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
    insertFilmeAtor,
    updateFilmeAtor,
    selectAllFilmeAtor,
    selectByIdFilmeAtor,
    selectAtoresByIdFilme,
    selectFilmesByIdAtor,
    deleteFilmeAtor,
    deleteAtoresByIdFilme
}