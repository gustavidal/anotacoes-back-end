/***************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD de ator.
 * Data: 22/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
***************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

// Import do arquivo do DAO para manipular os dados de ator no Banco de Dados
const atorDAO = require('../../model/DAO/ator/ator.js')

// Import das Controllers
const controllerSexo = require('../sexo/controller_sexo.js')

const inserirNovoAtor = async function (ator, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDados(ator)

            if (validar) {
                return validar // status-code: 400
            } else {
                let result = await atorDAO.insertAtor(ator)

                if (result) {
                    ator.id = result

                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response = ator

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

const atualizarAtor = async function (ator, id, contentType) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let buscarAtorResult = await buscarAtor(id)

            if (buscarAtorResult.status) {
                let validar = await validarDados(ator)

                if (!validar) {
                    ator.id = Number(id)

                    let result = await atorDAO.updateAtor(ator)

                    if (result) {
                        customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_UPDATED_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_UPDATED_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_UPDATED_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response = ator

                        return customMessages.DEFAULT_MESSAGE // status-code: 200
                    } else {
                        return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                    }
                } else {
                    return validar // status-code: 400 (atributo)
                }
            } else {
                return buscarAtorResult // status-code: 400 (id) ou 404 (not found)
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE // status-code: 415
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const listarAtor = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await atorDAO.selectAllAtor()

        if (result) {
            if (result.length > 0) {
                for (let ator of result) {
                    let resultSexo = await controllerSexo.buscarSexo(ator.id_sexo)

                    if (resultSexo.status) {
                        ator.sexo = resultSexo.response.sexo
                        delete ator.id_sexo
                    }
                }

                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count = result.length
                customMessages.DEFAULT_MESSAGE.response.atores = result

                return customMessages.DEFAULT_MESSAGE // status-code: 200
            } else {
                return customMessages.ERROR_NOT_FOUND // status-code: 404
            }
        } else {
            return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const buscarAtor = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await atorDAO.selectByIdAtor(id)

            if (result) {
                if (result.length > 0) {
                    for (let ator of result) {
                        let resultSexo = await controllerSexo.buscarSexo(ator.id_sexo)

                        if (resultSexo.status) {
                            ator.sexo = resultSexo.response.sexo
                            delete ator.id_sexo
                        }
                    }

                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.ator = result

                    return customMessages.DEFAULT_MESSAGE // status-code: 200
                } else {
                    return customMessages.ERROR_NOT_FOUND // status-code: 404
                }
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const excluirAtor = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarAtorResult = await buscarAtor(id)

        if (buscarAtorResult.status) {
            let result = await atorDAO.deleteAtor(id)

            if (result) {
                return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        } else {
            return buscarAtorResult // status-code: 400 (id) ou 404 (not found)
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const validarDados = async function (ator) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (ator.nome == undefined || ator.nome == '' || ator.nome == null || ator.nome.length > 100) {
        customMessages.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
    } else if (ator.data_nascimento == undefined || ator.data_nascimento == '' || ator.data_nascimento == null || ator.data_nascimento.length != 10) {
        customMessages.ERROR_BAD_REQUEST.field = '[DATA DE NASCIMENTO] INVÁLIDA'
    } else if (ator.inicio_carreira == undefined || ator.inicio_carreira == '' || ator.inicio_carreira == null || isNaN(ator.inicio_carreira) || ator.inicio_carreira.length != 4) {
        customMessages.ERROR_BAD_REQUEST.field = '[INÍCIO DE CARREIRA] INVÁLIDO'
    } else if (ator.biografia == undefined || ator.biografia == '' || ator.biografia == null) {
        customMessages.ERROR_BAD_REQUEST.field = '[BIOGRAFIA] INVÁLIDA'
    } else if (ator.id_sexo == undefined || ator.id_sexo == '' || ator.id_sexo == null || isNaN(ator.id_sexo) || ator.id_sexo < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DE SEXO] INVÁLIDO'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoAtor,
    atualizarAtor,
    listarAtor,
    buscarAtor,
    excluirAtor
}