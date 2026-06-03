/********************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de relação entre ator e foto no banco de dados MySQL.
 * Data: 03/06/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
********************************************************************************************************/

// Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

// Import do arquivo de configurações para acesso ao Banco de Dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Criar conexão com o Banco de Dados MySQL conforme o arquivo de configuração
const knexConnection = knex(knexDatabaseConfig.development)

const insertAtorFoto = async function (atorFoto) {
    try {
        // Script SQL para inserção no database
        let sql = `
        insert into tbl_ator_foto (
            id_ator,
            id_foto
        ) values (
            ${atorFoto.id_ator},
            ${atorFoto.id_foto}
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

const updateAtorFoto = async function (atorFoto) {
    try {
        let sql = `
        update tbl_ator_foto set
            id_ator = ${atorFoto.id_ator},
            id_foto = ${atorFoto.id_foto}
        where id = ${atorFoto.id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllAtorFoto = async function () {
    try {
        // Script SQL para inserção no database
        let sql = `select * from tbl_ator_foto order by id desc;`

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

const selectByIdAtorFoto = async function (id) {
    try {
        let sql = `select * from tbl_ator_foto where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectFotosByIdAtor = async function (idAtor) {
    try {
        let sql = `
        select tbl_foto.*
        from tbl_ator
            inner join tbl_ator_foto
                on tbl_ator.id = tbl_ator_foto.id_ator
            inner join tbl_foto
                on tbl_foto.id = tbl_ator_foto.id_foto
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

const selectAtoresByIdFoto = async function (idFoto) {
    try {
        let sql = `
        select tbl_foto.*
        from tbl_ator
            inner join tbl_ator_foto
                on tbl_ator.id = tbl_ator_foto.id_ator
            inner join tbl_foto
                on tbl_foto.id = tbl_ator_foto.id_foto
        where tbl_ator.id = ${idFoto};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteAtorFoto = async function (id) {
    try {
        let sql = `delete from tbl_ator_foto where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

const deleteFotosByIdAtor = async function (idDiretor) {
    try {
        let sql = `delete from tbl_ator_foto where id_ator = ${idDiretor};`

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
    insertAtorFoto,
    updateAtorFoto,
    selectAllAtorFoto,
    selectByIdAtorFoto,
    selectFotosByIdAtor,
    selectAtoresByIdFoto,
    deleteAtorFoto,
    deleteFotosByIdAtor
}