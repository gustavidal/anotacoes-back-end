/************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD de relação entre ator e foto.
 * Data: 03/06/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
************************************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

// Import do arquivo do DAO para manipular os dados de diretorFoto no Banco de Dados
const atorFotoDAO = require('../../model/DAO/ator_foto/ator_foto.js')

const inserirNovoAtorFoto = async function (atorFoto) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let validar = await validarDados(atorFoto)

        if (validar) {
            return validar // status-code: 400
        } else {
            let result = await atorFotoDAO.insertAtorFoto(atorFoto)

            if (result) {
                atorFoto.id = result

                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_CREATED_ITEM.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_CREATED_ITEM.message
                customMessages.DEFAULT_MESSAGE.response = atorFoto

                return customMessages.DEFAULT_MESSAGE // status-code: 201
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        }
    } catch (error) {
        return configMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const atualizarAtorFoto = async function (atorFoto, id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarAtorFotoResult = await buscarAtorFoto(id)

        if (buscarAtorFotoResult.status) {
            let validar = await validarDados(atorFoto)

            if (!validar) {
                atorFoto.id = Number(id)

                let result = await atorFotoDAO.updateAtorFoto(atorFoto)

                if (result) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_UPDATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_UPDATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_UPDATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response = atorFoto

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

const listarAtorFoto = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await atorFotoDAO.selectAllAtorFoto()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count = result.length
                customMessages.DEFAULT_MESSAGE.response.ator_fotos = result

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

const buscarAtorFoto = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await atorFotoDAO.selectByIdAtorFoto(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.ator_foto = result

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

const buscarFotosIdAtor = async function (idAtor) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idAtor == undefined || String(idAtor).replaceAll(' ', '') == '' || idAtor == null || isNaN(idAtor) || idAtor < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID DO FILME] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await atorFotoDAO.selectFotosByIdAtor(idAtor)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.fotos_ator = result

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

const buscarAtoresIdFoto = async function (idFoto) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idFoto == undefined || String(idFoto).replaceAll(' ', '') == '' || idFoto == null || isNaN(idFoto) || idFoto < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID DO FILME] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await atorFotoDAO.selectAtoresByIdFoto(idFoto)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.atores_foto = result

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

const excluirAtorFoto = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarAtorFotoResult = await buscarAtorFoto(id)

        if (buscarAtorFotoResult.status) {
            let result = await atorFotoDAO.deleteAtorFoto(id)

            if (result) {
                return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        } else {
            return buscarAtorFotoResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const excluirFotosIdAtor = async function (idAtor) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await atorFotoDAO.deleteFotosByIdAtor(idAtor)

        if (result) {
            return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
        } else {
            return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
        }

    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const validarDados = async function (atorFoto) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (atorFoto.id_ator == undefined || atorFoto.id_ator == '' || atorFoto.id_ator == null || isNaN(atorFoto.id_ator) || atorFoto.id_ator < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DO ATOR] INVÁLIDO'
    } else if (atorFoto.id_foto == undefined || atorFoto.id_foto == '' || atorFoto.id_foto == null || isNaN(atorFoto.id_foto) || atorFoto.id_foto < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DA FOTO] INVÁLIDO'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoAtorFoto,
    atualizarAtorFoto,
    listarAtorFoto,
    buscarAtorFoto,
    buscarFotosIdAtor,
    buscarAtoresIdFoto,
    excluirAtorFoto,
    excluirFotosIdAtor
}