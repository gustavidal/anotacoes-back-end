/**************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do diretor no banco de dados MySQL.
 * Data: 22/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
**************************************************************************************/

// Import da biblioteca para manipular dados no Banco de Dados MySQL
const knex = require('knex')

// Import do arquivo de configurações para acesso ao Banco de Dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

// Criar conexão com o Banco de Dados MySQL conforme o arquivo de configuração
const knexConnection = knex(knexDatabaseConfig.development)

const insertAtor = async function (ator) {
    try {
        let sql = `
        insert into tbl_ator (
            nome,
            data_nascimento,
            inicio_carreira,
            biografia,
            id_sexo
        ) values (
            replace("${ator.nome}", "'", ""),
            replace("${ator.data_nascimento}", "'", ""),
            ${ator.inicio_carreira},
            replace("${ator.biografia}", "'", ""),
            ${ator.id_sexo}
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

const updateAtor = async function (ator) {
    try {
        let sql = `
        update tbl_ator set
            nome            = replace("${ator.nome}", "'", ""),
            data_nascimento = replace("${ator.data_nascimento}", "'", ""),
            inicio_carreira = ${ator.inicio_carreira},
            biografia       = replace("${ator.biografia}", "'", ""),
            id_sexo         = ${ator.id_sexo}
        where id = ${ator.id};`
        
        let result = await knexConnection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllAtor = async function () {
    try {
        let sql = 'select * from tbl_ator order by id desc;'

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
        
    } catch (error) {
        return false
    }
}

const selectByIdAtor = async function (id) {
    try {
        let sql = `select * from tbl_ator where id = ${id};`

        let result = await knexConnection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false
        
    } catch (error) {
        return false
    }
}

const deleteAtor = async function (id) {
    try {
        let sql = `delete from tbl_ator where id = ${id};`

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
    insertAtor,
    updateAtor,
    selectAllAtor,
    selectByIdAtor,
    deleteAtor
}