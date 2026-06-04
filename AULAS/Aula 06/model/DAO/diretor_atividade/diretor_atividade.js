/****************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de relação entre diretor e atividade no banco de dados MySQL.
 * Data: 29/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
****************************************************************************************************************/

// Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

// Import do arquivo de configurações para acesso ao Banco de Dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Criar conexão com o Banco de Dados MySQL conforme o arquivo de configuração
const knexConnection = knex(knexDatabaseConfig.development)

const insertDiretorAtividade = async function (diretorAtividade) {
    try {
        // Script SQL para inserção no database
        let sql = `
        insert into tbl_diretor_atividade (
            id_diretor,
            id_atividade
        ) values (
            ${diretorAtividade.id_diretor},
            ${diretorAtividade.id_atividade}
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

const updateDiretorAtividade = async function (diretorAtividade) {
    try {
        let sql = `
        update tbl_diretor_atividade set
            id_diretor   = ${diretorAtividade.id_diretor},
            id_atividade = ${diretorAtividade.id_atividade}
        where id = ${diretorAtividade.id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllDiretorAtividade = async function () {
    try {
        // Script SQL para inserção no database
        let sql = `select * from tbl_diretor_atividade order by id desc;`

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

const selectByIdDiretorAtividade = async function (id) {
    try {
        let sql = `select * from tbl_diretor_atividade where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAtividadesByIdDiretor = async function (idDiretor) {
    try {
        let sql = `
        select tbl_atividade.*
        from tbl_diretor
            inner join tbl_diretor_atividade
                on tbl_diretor.id = tbl_diretor_atividade.id_diretor
            inner join tbl_atividade
                on tbl_atividade.id = tbl_diretor_atividade.id_atividade
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

const selectDiretoresByIdAtividade = async function (idAtividade) {
    try {
        let sql = `
        select tbl_atividade.*
        from tbl_diretor
            inner join tbl_diretor_atividade
                on tbl_diretor.id = tbl_diretor_atividade.id_diretor
            inner join tbl_atividade
                on tbl_atividade.id = tbl_diretor_atividade.id_atividade
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

const deleteDiretorAtividade = async function (id) {
    try {
        let sql = `delete from tbl_diretor_atividade where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

const deleteAtividadesByIdDiretor = async function (idDiretor) {
    try {
        let sql = `delete from tbl_diretor_atividade where id_diretor = ${idDiretor};`

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
    insertDiretorAtividade,
    updateDiretorAtividade,
    selectAllDiretorAtividade,
    selectByIdDiretorAtividade,
    selectAtividadesByIdDiretor,
    selectDiretoresByIdAtividade,
    deleteDiretorAtividade,
    deleteAtividadesByIdDiretor
}