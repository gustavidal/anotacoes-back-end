/*************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD de relação entre filme e ator.
 * Data: 22/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
*************************************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

// Import do arquivo do DAO para manipular os dados de filmeAtor no Banco de Dados
const filmeAtorDAO = require('../../model/DAO/filme_ator/filme_ator.js')

// Import das Controllers
const controllerAtor = require('../ator/controller_ator.js')

const inserirNovoFilmeAtor = async function (filmeAtor) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let validar = await validarDados(filmeAtor)

        if (validar) {
            return validar // status-code: 400
        } else {
            let result = await filmeAtorDAO.insertFilmeAtor(filmeAtor)

            if (result) {
                filmeAtor.id = result

                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_CREATED_ITEM.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_CREATED_ITEM.message
                customMessages.DEFAULT_MESSAGE.response = filmeAtor

                return customMessages.DEFAULT_MESSAGE // status-code: 201
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        }
    } catch (error) {
        return configMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const atualizarFilmeAtor = async function (filmeAtor, id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarFilmeAtorResult = await buscarFilmeAtor(id)

        if (buscarFilmeAtorResult.status) {
            let validar = await validarDados(filmeAtor)

            if (!validar) {
                filmeAtor.id = Number(id)

                let result = await filmeAtorDAO.updateFilmeAtor(filmeAtor)

                if (result) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_UPDATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_UPDATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_UPDATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response = filmeAtor

                    return customMessages.DEFAULT_MESSAGE // status-code: 200
                } else {
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                }
            } else {
                return validar // status-code: 400 (atributo)
            }
        } else {
            return buscarFilmeAtorResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const listarFilmeAtor = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filmeAtorDAO.selectAllFilmeAtor()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count = result.length
                customMessages.DEFAULT_MESSAGE.response.filme_atores = result

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

const buscarFilmeAtor = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await filmeAtorDAO.selectByIdFilmeAtor(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.filme_atores = result

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

const buscarAtoresIdFilme = async function (idFilme) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idFilme == undefined || String(idFilme).replaceAll(' ', '') == '' || idFilme == null || isNaN(idFilme) || idFilme < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID DO FILME] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await filmeAtorDAO.selectAtoresByIdFilme(idFilme)

            if (result) {
                if (result.length > 0) {
                    for (let indice in result) {
                        let ator = await controllerAtor.buscarAtor(result[indice].id)
                        result[indice] = ator.response.ator[0]
                    }

                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.atores_filme = result

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

const buscarFilmesIdAtor = async function (idAtor) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idAtor == undefined || String(idAtor).replaceAll(' ', '') == '' || idAtor == null || isNaN(idAtor) || idAtor < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID DO ATOR] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await filmeAtorDAO.selectFilmesByIdAtor(idAtor)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.filmes_ator = result

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

const excluirFilmeAtor = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarFilmeAtorResult = await buscarFilmeAtor(id)

        if (buscarFilmeAtorResult.status) {
            let result = await filmeAtorDAO.deleteFilmeAtor(id)

            if (result) {
                return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        } else {
            return buscarFilmeAtorResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const excluirAtoresIdFilme = async function (idFilme) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filmeAtorDAO.deleteAtoresByIdFilme(idFilme)

        if (result) {
            return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
        } else {
            return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
        }

    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const validarDados = async function (filmeAtor) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (filmeAtor.id_filme == undefined || filmeAtor.id_filme == '' || filmeAtor.id_filme == null || isNaN(filmeAtor.id_filme) || filmeAtor.id_filme < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DO FILME] INVÁLIDO'
    } else if (filmeAtor.id_ator == undefined || filmeAtor.id_ator == '' || filmeAtor.id_ator == null || isNaN(filmeAtor.id_ator) || filmeAtor.id_ator < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DO ATOR] INVÁLIDO'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoFilmeAtor,
    atualizarFilmeAtor,
    listarFilmeAtor,
    buscarFilmeAtor,
    buscarAtoresIdFilme,
    buscarFilmesIdAtor,
    excluirFilmeAtor,
    excluirAtoresIdFilme
}