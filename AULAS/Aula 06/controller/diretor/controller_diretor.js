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
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let buscarDiretorResult = await buscarDiretor(id)

            if (buscarDiretorResult.status) {
                let validar = await validarDados(diretor)

                if (!validar) {
                    diretor.id = Number(id)

                    let result = await diretorDAO.updateDiretor(diretor)

                    if (result) {
                        customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_UPDATED_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_UPDATED_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_UPDATED_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response = diretor

                        return customMessages.DEFAULT_MESSAGE // status-code: 200
                    } else {
                        return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                    }
                } else {
                    return validar // status-code: 400 (atributo)
                }
            } else {
                return buscarDiretorResult // status-code: 400 (id) ou 404 (not found)
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE // status-code: 415
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const listarDiretor = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await diretorDAO.selectAllDiretor()

        if (result) {
            if (result.length > 0) {
                for (let diretor of result) {
                    let resultSexo = await controllerSexo.buscarSexo(diretor.id_sexo)

                    if (resultSexo.status) {
                        diretor.sexo = resultSexo.response.sexo
                        delete diretor.id_sexo
                    }
                }

                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count = result.length
                customMessages.DEFAULT_MESSAGE.response.diretores = result

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

const buscarDiretor = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await diretorDAO.selectByIdDiretor(id)

            if (result) {
                if (result.length > 0) {
                    for (let diretor of result) {
                        let resultSexo = await controllerSexo.buscarSexo(diretor.id_sexo)

                        if (resultSexo.status) {
                            diretor.sexo = resultSexo.response.sexo
                            delete diretor.id_sexo
                        }
                    }

                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.diretor = result

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

const excluirDiretor = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarDiretorResult = await buscarDiretor(id)

        if (buscarDiretorResult.status) {
            let result = await diretorDAO.deleteDiretor(id)

            if (result) {
                return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        } else {
            return buscarDiretorResult // status-code: 400 (id) ou 404 (not found)
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
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