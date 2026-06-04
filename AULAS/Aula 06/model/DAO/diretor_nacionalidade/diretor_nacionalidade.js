/********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de relação entre diretor e nacionalidade no banco de dados MySQL.
 * Data: 29/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
********************************************************************************************************************/

// Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

// Import do arquivo de configurações para acesso ao Banco de Dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Criar conexão com o Banco de Dados MySQL conforme o arquivo de configuração
const knexConnection = knex(knexDatabaseConfig.development)

const insertDiretorNacionalidade = async function (diretorNacionalidade) {
    try {
        // Script SQL para inserção no database
        let sql = `
        insert into tbl_diretor_nacionalidade (
            id_diretor,
            id_nacionalidade
        ) values (
            ${diretorNacionalidade.id_diretor},
            ${diretorNacionalidade.id_nacionalidade}
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

const updateDiretorNacionalidade = async function (diretorNacionalidade) {
    try {
        let sql = `
        update tbl_diretor_nacionalidade set
            id_diretor       = ${diretorNacionalidade.id_diretor},
            id_nacionalidade = ${diretorNacionalidade.id_nacionalidade}
        where id = ${diretorNacionalidade.id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllDiretorNacionalidade = async function () {
    try {
        // Script SQL para inserção no database
        let sql = `select * from tbl_diretor_nacionalidade order by id desc;`

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

const selectByIdDiretorNacionalidade = async function (id) {
    try {
        let sql = `select * from tbl_diretor_nacionalidade where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectNacionalidadesByIdDiretor = async function (idDiretor) {
    try {
        let sql = `
        select tbl_nacionalidade.*
        from tbl_diretor
            inner join tbl_diretor_nacionalidade
                on tbl_diretor.id = tbl_diretor_nacionalidade.id_diretor
            inner join tbl_nacionalidade
                on tbl_nacionalidade.id = tbl_diretor_nacionalidade.id_nacionalidade
        where tbl_diretor.id = ${idDiretor};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectDiretoresByIdNacionalidade = async function (idNacionalidade) {
    try {
        let sql = `
        select tbl_diretor.*
        from tbl_diretor
            inner join tbl_diretor_nacionalidade
                on tbl_diretor.id = tbl_diretor_nacionalidade.id_diretor
            inner join tbl_nacionalidade
                on tbl_nacionalidade.id = tbl_diretor_nacionalidade.id_nacionalidade
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

const deleteDiretorNacionalidade = async function (id) {
    try {
        let sql = `delete from tbl_diretor_nacionalidade where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteNacionalidadesByIdDiretor = async function (idDiretor) {
    try {
        let sql = `delete from tbl_diretor_nacionalidade where id_diretor = ${idDiretor};`

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
    insertDiretorNacionalidade,
    updateDiretorNacionalidade,
    selectAllDiretorNacionalidade,
    selectByIdDiretorNacionalidade,
    selectNacionalidadesByIdDiretor,
    selectDiretoresByIdNacionalidade,
    deleteDiretorNacionalidade,
    deleteNacionalidadesByIdDiretor
}