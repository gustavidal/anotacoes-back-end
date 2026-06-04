/************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD de relação entre diretor e nacionalidade.
 * Data: 29/05/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
************************************************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

// Import do arquivo do DAO para manipular os dados de diretorNacionalidade no Banco de Dados
const diretorNacionalidadeDAO = require('../../model/DAO/diretor_nacionalidade/diretor_nacionalidade.js')

const inserirNovoDiretorNacionalidade = async function (diretorNacionalidade) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let validar = await validarDados(diretorNacionalidade)

        if (validar) {
            return validar // status-code: 400
        } else {
            let result = await diretorNacionalidadeDAO.insertDiretorNacionalidade(diretorNacionalidade)

            if (result) {
                diretorNacionalidade.id = result

                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_CREATED_ITEM.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_CREATED_ITEM.message
                customMessages.DEFAULT_MESSAGE.response = diretorNacionalidade

                return customMessages.DEFAULT_MESSAGE // status-code: 201
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        }
    } catch (error) {
        return configMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const atualizarDiretorNacionalidade = async function (diretorNacionalidade, id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarDiretorNacionalidadeResult = await buscarDiretorNacionalidade(id)

        if (buscarDiretorNacionalidadeResult.status) {
            let validar = await validarDados(diretorNacionalidade)

            if (!validar) {
                diretorNacionalidade.id = Number(id)

                let result = await diretorNacionalidadeDAO.updateDiretorNacionalidade(diretorNacionalidade)

                if (result) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_UPDATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_UPDATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message = customMessages.SUCCESS_UPDATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response = diretorNacionalidade

                    return customMessages.DEFAULT_MESSAGE // status-code: 200
                } else {
                    return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                }
            } else {
                return validar // status-code: 400 (atributo)
            }
        } else {
            return buscarDiretorNacionalidadeResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const listarDiretorNacionalidade = async function () {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await diretorNacionalidadeDAO.selectAllDiretorNacionalidade()

        if (result) {
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count = result.length
                customMessages.DEFAULT_MESSAGE.response.diretor_nacionalidades = result

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

const buscarDiretorNacionalidade = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await diretorNacionalidadeDAO.selectByIdDiretorNacionalidade(id)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.diretor_nacionalidade = result

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

const buscarNacionalidadesIdDiretor = async function (idDiretor) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idDiretor == undefined || String(idDiretor).replaceAll(' ', '') == '' || idDiretor == null || isNaN(idDiretor) || idDiretor < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID DO DIRETOR] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await diretorNacionalidadeDAO.selectNacionalidadesByIdDiretor(idDiretor)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.nacionalidades_diretor = result

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

const buscarDiretoresIdNacionalidade = async function (idNacionalidade) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idNacionalidade == undefined || String(idNacionalidade).replaceAll(' ', '') == '' || idNacionalidade == null || isNaN(idNacionalidade) || idNacionalidade < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID DA NACIONALIDADE] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            let result = await diretorNacionalidadeDAO.selectDiretoresByIdNacionalidade(idNacionalidade)

            if (result) {
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.diretores_nacionalidade = result

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

const excluirDiretorNacionalidade = async function (id) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let buscarDiretorNacionalidadeResult = await buscarDiretorNacionalidade(id)

        if (buscarDiretorNacionalidadeResult.status) {
            let result = await diretorNacionalidadeDAO.deleteDiretorNacionalidade(id)

            if (result) {
                return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        } else {
            return buscarDiretorNacionalidadeResult // status-code: 400 (id) ou 404
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const excluirNacionalidadesIdDiretor = async function (idDiretor) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await diretorNacionalidadeDAO.deleteNacionalidadesByIdDiretor(idDiretor)

        if (result) {
            return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
        } else {
            return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
        }

    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

const validarDados = async function (diretorNacionalidade) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (diretorNacionalidade.id_diretor == undefined || diretorNacionalidade.id_diretor == '' || diretorNacionalidade.id_diretor == null || isNaN(diretorNacionalidade.id_diretor) || diretorNacionalidade.id_diretor < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DO DIRETOR] INVÁLIDO'
    } else if (diretorNacionalidade.id_nacionalidade == undefined || diretorNacionalidade.id_nacionalidade == '' || diretorNacionalidade.id_nacionalidade == null || isNaN(diretorNacionalidade.id_nacionalidade) || diretorNacionalidade.id_nacionalidade < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID DA NACIONALIDADE] INVÁLIDO'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoDiretorNacionalidade,
    atualizarDiretorNacionalidade,
    listarDiretorNacionalidade,
    buscarDiretorNacionalidade,
    buscarNacionalidadesIdDiretor,
    buscarDiretoresIdNacionalidade,
    excluirDiretorNacionalidade,
    excluirNacionalidadesIdDiretor
}