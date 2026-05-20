/******************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD de diretor.
 * Data: 20/05/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
******************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

// Import do arquivo do DAO para manipular os dados de diretor no Banco de Dados
const diretorDAO = require('../../model/DAO/diretor/diretor.js')

// Import das Controllers
const controllerSexo = require('../sexo/controller_sexo.js')

const inserirNovoDiretor = async function (diretor, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(diretor)

            if (validar) {
                return validar // status-code: 400
            } else {
                let result = await diretorDAO.insertDiretor(diretor)

                if (result) {
                    diretor.id = result

                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response = diretor

                    return customMessages.DEFAULT_MESSAGE // status-code: 201
                } else {
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                }
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE // status-code: 415
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const atualizarDiretor = async function (diretor, id, contentType) {

}

const listarDiretor = async function () {

}

const buscarDiretor = async function (id) {

}

const excluirDiretor = async function (id) {

}

const validarDados = async function (diretor) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (diretor.nome == undefined || diretor.nome == '' || diretor.nome == null || diretor.nome.length > 100) {
        customMessages.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
    } else if (diretor.data_nascimento == undefined || diretor.data_nascimento == '' || diretor.data_nascimento == null || diretor.data_nascimento.length != 10) {
        customMessages.ERROR_BAD_REQUEST.field = '[DATA DE NASCIMENTO] INVÁLIDA'
    } else if (diretor.inicio_carreira == undefined || diretor.inicio_carreira == '' || diretor.inicio_carreira == null || isNaN(diretor.inicio_carreira) || diretor.inicio_carreira.length != 4) {
        customMessages.ERROR_BAD_REQUEST.field = '[INÍCIO DE CARREIRA] INVÁLIDO'
    } else if (diretor.id_sexo == undefined || diretor.id_sexo == '' || diretor.id_sexo == null || isNaN(diretor.id_sexo) || diretor.id_sexo < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DE SEXO] INVÁLIDO'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoDiretor,
    atualizarDiretor,
    listarDiretor,
    buscarDiretor,
    excluirDiretor
}