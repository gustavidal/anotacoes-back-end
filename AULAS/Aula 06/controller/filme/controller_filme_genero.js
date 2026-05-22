/**********************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD de relação entre filme e gênero cênico.
 * Data: 22/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
**********************************************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

// Import do arquivo do DAO para manipular os dados de gênero cênico no Banco de Dados
const filmeGeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js')

const inserirNovoFilmeGenero = async function (filmeGenero) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let validar = await validarDados(filmeGenero)

        if (validar) {
            return validar // status-code: 400
        } else {
            let result = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)

            if (result) {
                filmeGenero.id = result

                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_CREATED_ITEM.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_CREATED_ITEM.message
                customMessages.DEFAULT_MESSAGE.response = filmeGenero

                return customMessages.DEFAULT_MESSAGE // status-code: 201
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        }
    } catch (error) {
        return configMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const atualizarFilmeGenero = async function (filmeGenero, id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarFilmeGeneroResult = await buscarFilmeGenero(id)

        if (buscarFilmeGeneroResult.status) {
            let validar = await validarDados(filmeGenero)

            if (!validar) {
                filmeGenero.id = Number(id)

                let result = await filmeGeneroDAO.updateFilmeGenero(filmeGenero)

                if (result) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_UPDATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_UPDATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_UPDATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response = filmeGenero

                    return customMessages.DEFAULT_MESSAGE // status-code: 200
                } else {
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                }
            } else {
                return validar // status-code: 400 (atributo)
            }
        } else {
            return buscarFilmeGeneroResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const listarFilmeGenero = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filmeGeneroDAO.selectAllFilmeGenero()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count = result.length
                customMessages.DEFAULT_MESSAGE.response.filme_generos = result

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

const buscarFilmeGenero = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.filme_genero = result

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

const buscarGenerosIdFilme = async function (idFilme) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idFilme == undefined || String(idFilme).replaceAll(' ', '') == '' || idFilme == null || isNaN(idFilme) || idFilme < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID DO FILME] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await filmeGeneroDAO.selectGenerosByIdFilme(idFilme)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.generos_filme = result

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

const buscarFilmesIdGenero = async function (idGenero) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idGenero == undefined || String(idGenero).replaceAll(' ', '') == '' || idGenero == null || isNaN(idGenero) || idGenero < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID DO FILME] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await filmeGeneroDAO.selectFilmesByIdGenero(idGenero)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.filmes_genero = result

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

const excluirFilmeGenero = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarFilmeGeneroResult = await buscarFilmeGenero(id)

        if (buscarFilmeGeneroResult.status) {
            let result = await filmeGeneroDAO.deleteFilmeGenero(id)

            if (result) {
                return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        } else {
            return buscarFilmeGeneroResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const validarDados = async function (filmeGenero) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (filmeGenero.id_filme == undefined || filmeGenero.id_filme == '' || filmeGenero.id_filme == null || isNaN(filmeGenero.id_filme) || filmeGenero.id_filme < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DO FILME] INVÁLIDO'
    } else if (filmeGenero.id_genero == undefined || filmeGenero.id_genero == '' || filmeGenero.id_genero == null || isNaN(filmeGenero.id_genero) || filmeGenero.id_genero < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DO GÊNERO] INVÁLIDO'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoFilmeGenero,
    atualizarFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    buscarGenerosIdFilme,
    buscarFilmesIdGenero,
    excluirFilmeGenero
}