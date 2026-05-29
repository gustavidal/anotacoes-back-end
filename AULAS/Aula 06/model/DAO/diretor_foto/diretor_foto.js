/***********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de relação entre diretor e foto no banco de dados MySQL.
 * Data: 29/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
***********************************************************************************************************/

// Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

// Import do arquivo de configurações para acesso ao Banco de Dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Criar conexão com o Banco de Dados MySQL conforme o arquivo de configuração
const knexConnection = knex(knexDatabaseConfig.development)

const insertDiretorFoto = async function (diretorFoto) {
    try {
        // Script SQL para inserção no database
        let sql = `
        insert into tbl_diretor_foto (
            id_diretor,
            id_foto
        ) values (
            ${diretorFoto.id_diretor},
            ${diretorFoto.id_foto}
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

const updateDiretorFoto = async function (diretorFoto) {
    try {
        let sql = `
        update tbl_diretor_foto set
            id_diretor = ${diretorFoto.id_diretor},
            id_foto    = ${diretorFoto.id_foto}
        where id = ${diretorFoto.id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllDiretorFoto = async function () {
    try {
        // Script SQL para inserção no database
        let sql = `select * from tbl_diretor_foto order by id desc;`

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

const selectByIdDiretorFoto = async function (id) {
    try {
        let sql = `select * from tbl_diretor_foto where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectFotosByIdDiretor = async function (idDiretor) {
    try {
        let sql = `
        select tbl_foto.*
        from tbl_diretor
            inner join tbl_diretor_foto
                on tbl_diretor.id = tbl_diretor_foto.id_diretor
            inner join tbl_foto
                on tbl_foto.id = tbl_diretor_foto.id_foto
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

const selectDiretoresByIdFoto = async function (idFoto) {
    try {
        let sql = `
        select tbl_foto.*
        from tbl_diretor
            inner join tbl_diretor_foto
                on tbl_diretor.id = tbl_diretor_foto.id_diretor
            inner join tbl_foto
                on tbl_foto.id = tbl_diretor_foto.id_foto
        where tbl_foto.id = ${idFoto};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteDiretorFoto = async function (id) {
    try {
        let sql = `delete from tbl_diretor_foto where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

const deleteFotosByIdDiretor = async function (idDiretor) {
    try {
        let sql = `delete from tbl_diretor_foto where id_filme = ${idDiretor};`

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
    insertDiretorFoto,
    updateDiretorFoto,
    selectAllDiretorFoto,
    selectByIdDiretorFoto,
    selectFotosByIdDiretor,
    selectDiretoresByIdFoto,
    deleteDiretorFoto,
    deleteFotosByIdDiretor
}