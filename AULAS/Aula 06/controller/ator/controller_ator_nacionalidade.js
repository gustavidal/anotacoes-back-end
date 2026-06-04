/*********************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD de relação entre ator e nacionalidade.
 * Data: 03/06/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*********************************************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

// Import do arquivo do DAO para manipular os dados de diretorNacionalidade no Banco de Dados
const atorNacionalidadeDAO = require('../../model/DAO/ator_nacionalidade/ator_nacionalidade.js')

const inserirNovoAtorNacionalidade = async function (atorNacionalidade) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let validar = await validarDados(atorNacionalidade)

        if (validar) {
            return validar // status-code: 400
        } else {
            let result = await atorNacionalidadeDAO.insertAtorNacionalidade(atorNacionalidade)

            if (result) {
                atorNacionalidade.id = result

                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_CREATED_ITEM.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_CREATED_ITEM.message
                customMessages.DEFAULT_MESSAGE.response = atorNacionalidade

                return customMessages.DEFAULT_MESSAGE // status-code: 201
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        }
    } catch (error) {
        return configMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const atualizarAtorNacionalidade = async function (atorNacionalidade, id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarAtorNacionalidadeResult = await buscarAtorNacionalidade(id)

        if (buscarAtorNacionalidadeResult.status) {
            let validar = await validarDados(atorNacionalidade)

            if (!validar) {
                atorNacionalidade.id = Number(id)

                let result = await atorNacionalidadeDAO.updateAtorNacionalidade(atorNacionalidade)

                if (result) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_UPDATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_UPDATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_UPDATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response = atorNacionalidade

                    return customMessages.DEFAULT_MESSAGE // status-code: 200
                } else {
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                }
            } else {
                return validar // status-code: 400 (atributo)
            }
        } else {
            return buscarAtorFotoResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const listarAtorNacionalidade = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await atorNacionalidadeDAO.selectAllAtorNacionalidade()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count = result.length
                customMessages.DEFAULT_MESSAGE.response.ator_nacionalidades = result

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

const buscarAtorNacionalidade = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await atorNacionalidadeDAO.selectByIdAtorNacionalidade(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.ator_nacionalidade = result

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

const buscarNacionalidadesIdAtor = async function (idAtor) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idAtor == undefined || String(idAtor).replaceAll(' ', '') == '' || idAtor == null || isNaN(idAtor) || idAtor < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID DO ATOR] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await atorNacionalidadeDAO.selectNacionalidadesByIdAtor(idAtor)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.nacionalidades_ator = result

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

const buscarAtoresIdNacionalidade = async function (idNacionalidade) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idNacionalidade == undefined || String(idNacionalidade).replaceAll(' ', '') == '' || idNacionalidade == null || isNaN(idNacionalidade) || idNacionalidade < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID DA NACIONALIDADE] INVÁLIDA'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await atorNacionalidadeDAO.selectAtoresByIdNacionalidade(idNacionalidade)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.atores_nacionalidade = result

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

const excluirAtorNacionalidade = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarAtorNacionalidadeResult = await buscarAtorNacionalidade(id)

        if (buscarAtorNacionalidadeResult.status) {
            let result = await atorNacionalidadeDAO.deleteAtorNacionalidade(id)

            if (result) {
                return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        } else {
            return buscarAtorNacionalidadeResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const excluirNacionalidadesIdAtor = async function (idAtor) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await atorNacionalidadeDAO.deleteNacionalidadesByIdAtor(idAtor)

        if (result) {
            return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
        } else {
            return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
        }

    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const validarDados = async function (atorNacionalidade) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (atorNacionalidade.id_ator == undefined || atorNacionalidade.id_ator == '' || atorNacionalidade.id_ator == null || isNaN(atorNacionalidade.id_ator) || atorNacionalidade.id_ator < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DO ATOR] INVÁLIDO'
    } else if (atorNacionalidade.id_nacionalidade == undefined || atorNacionalidade.id_nacionalidade == '' || atorNacionalidade.id_nacionalidade == null || isNaN(atorNacionalidade.id_nacionalidade) || atorNacionalidade.id_nacionalidade < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DA NACIONALIDADE] INVÁLIDA'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoAtorNacionalidade,
    atualizarAtorNacionalidade,
    listarAtorNacionalidade,
    buscarAtorNacionalidade,
    buscarNacionalidadesIdAtor,
    buscarAtoresIdNacionalidade,
    excluirAtorNacionalidade,
    excluirNacionalidadesIdAtor
}