/******************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de relação entre filme e gênero cênico no banco de dados MySQL.
 * Data: 22/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
******************************************************************************************************************/

// Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

// Import do arquivo de configurações para acesso ao Banco de Dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Criar conexão com o Banco de Dados MySQL conforme o arquivo de configuração
const knexConnection = knex(knexDatabaseConfig.development)

const insertFilmeGenero = async function (filmeGenero) {
    try {
        // Script SQL para inserção no database
        let sql = `
        insert into tbl_filme_genero (
            id_filme,
            id_genero
        ) values (
            ${filmeGenero.id_filme},
            ${filmeGenero.id_genero}
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

const updateFilmeGenero = async function (filmeGenero) {
    try {
        let sql = `
        update tbl_filme_genero set
            id_filme  = ${filmeGenero.id_filme},
            id_genero = ${filmeGenero.id_genero}
        where id = ${filmeGenero.id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllFilmeGenero = async function () {
    try {
        // Script SQL para inserção no database
        let sql = `select * from tbl_filme_genero order by id desc;`

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

const selectByIdFilmeGenero = async function (id) {
    try {
        let sql = `select * from tbl_filme_genero where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectGenerosByIdFilme = async function (idFilme) {
    try {
        let sql = `
        select tbl_genero.*
        from tbl_filme
            inner join tbl_filme_genero
                on tbl_filme.id = tbl_filme_genero.id_filme
            inner join tbl_genero
                on tbl_genero.id = tbl_filme_genero.id_genero
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

const selectFilmesByIdGenero = async function (idGenero) {
    try {
        let sql = `
        select tbl_filme.*
        from tbl_filme
            inner join tbl_filme_genero
                on tbl_filme.id = tbl_filme_genero.id_filme
            inner join tbl_genero
                on tbl_genero.id = tbl_filme_genero.id_genero
        where tbl_genero.id = ${idGenero};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteFilmeGenero = async function (id) {
    try {
        let sql = `delete from tbl_filme_genero where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

const deleteGenerosByIdFilme = async function (idFilme) {
    try {
        let sql = `delete from tbl_filme_genero where id_filme = ${idFilme};`

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
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    selectGenerosByIdFilme,
    selectFilmesByIdGenero,
    deleteFilmeGenero,
    deleteGenerosByIdFilme
}