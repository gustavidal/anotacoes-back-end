/***************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD de relação entre diretor e foto.
 * Data: 29/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
***************************************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

// Import do arquivo do DAO para manipular os dados de diretorFoto no Banco de Dados
const diretorFotoDAO = require('../../model/DAO/diretor_foto/diretor_foto.js')

const inserirNovoDiretorFoto = async function (diretorFoto) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let validar = await validarDados(diretorFoto)

        if (validar) {
            return validar // status-code: 400
        } else {
            let result = await diretorFotoDAO.insertDiretorFoto(diretorFoto)

            if (result) {
                diretorFoto.id = result

                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_CREATED_ITEM.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_CREATED_ITEM.message
                customMessages.DEFAULT_MESSAGE.response = diretorFoto

                return customMessages.DEFAULT_MESSAGE // status-code: 201
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        }
    } catch (error) {
        return configMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const atualizarDiretorFoto = async function (diretorFoto, id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarDiretorFotoResult = await buscarDiretorFoto(id)

        if (buscarDiretorFotoResult.status) {
            let validar = await validarDados(diretorFoto)

            if (!validar) {
                diretorFoto.id = Number(id)

                let result = await diretorFotoDAO.updateDiretorFoto(diretorFoto)

                if (result) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_UPDATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_UPDATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_UPDATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response = diretorFoto

                    return customMessages.DEFAULT_MESSAGE // status-code: 200
                } else {
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                }
            } else {
                return validar // status-code: 400 (atributo)
            }
        } else {
            return buscarDiretorFotoResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const listarDiretorFoto = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await diretorFotoDAO.selectAllDiretorFoto()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count = result.length
                customMessages.DEFAULT_MESSAGE.response.diretor_fotos = result

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

const buscarDiretorFoto = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await diretorFotoDAO.selectByIdDiretorFoto(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.diretor_foto = result

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

const buscarFotosIdDiretor = async function (idDiretor) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idDiretor == undefined || String(idDiretor).replaceAll(' ', '') == '' || idDiretor == null || isNaN(idDiretor) || idDiretor < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID DO FILME] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await diretorFotoDAO.selectFotosByIdDiretor(idDiretor)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.fotos_diretor = result

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

const buscarDiretoresIdFoto = async function (idFoto) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idFoto == undefined || String(idFoto).replaceAll(' ', '') == '' || idFoto == null || isNaN(idFoto) || idFoto < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID DO FILME] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await diretorFotoDAO.selectDiretoresByIdFoto(idFoto)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.diretores_foto = result

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

const excluirDiretorFoto = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarDiretorFotoResult = await buscarDiretorFoto(id)

        if (buscarDiretorFotoResult.status) {
            let result = await diretorFotoDAO.deleteDiretorFoto(id)

            if (result) {
                return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        } else {
            return buscarDiretorFotoResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const excluirFotosIdDiretor = async function (idDiretor) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await diretorFotoDAO.deleteFotosByIdDiretor(idDiretor)

        if (result) {
            return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
        } else {
            return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
        }

    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const validarDados = async function (diretorFoto) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (diretorFoto.id_diretor == undefined || diretorFoto.id_diretor == '' || diretorFoto.id_diretor == null || isNaN(diretorFoto.id_diretor) || diretorFoto.id_diretor < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DO DIRETOR] INVÁLIDO'
    } else if (diretorFoto.id_foto == undefined || diretorFoto.id_foto == '' || diretorFoto.id_foto == null || isNaN(diretorFoto.id_foto) || diretorFoto.id_foto < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DA FOTO] INVÁLIDO'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoDiretorFoto,
    atualizarDiretorFoto,
    listarDiretorFoto,
    buscarDiretorFoto,
    buscarFotosIdDiretor,
    buscarDiretoresIdFoto,
    excluirDiretorFoto,
    excluirFotosIdDiretor
}