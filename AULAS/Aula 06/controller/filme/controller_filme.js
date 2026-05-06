/****************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados para realizar o CRUD de filme.
 * Data: 17/04/2026 (sexta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
****************************************************************************************************************/

// Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

// Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

// Função para inserir um novo filme
const inserirNovoFilme = async function (filme, contentType) {
    // Cria uma cópia dos JSON's do arquivo de configurações de mensagens
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        // Valida o tipo de dado recebido
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            // Chama a função para validar a entrada dos dados
            let validar = await validarDados(filme)

            // Retorna um JSON de erro caso algum atributo seja inválido.
            // Caso não, o mesmo retorna false (sem erros)
            if (validar) {
                return validar // status-code: 400
            } else {
                // Encaminha os dados do filme ao DAO para inserção no database
                let result = await filmeDAO.insertFilme(await tratarDados(filme))

                if (result) {
                    // Adiciona o atributo id no JSON e retorna o valor gerado no DAO
                    filme.id = result

                    customMessages.DEFAULT_MESSAGE.status      = customMessages.SUCCESS_CREATED_ITEM.status
                    customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_CREATED_ITEM.status_code
                    customMessages.DEFAULT_MESSAGE.message     = customMessages.SUCCESS_CREATED_ITEM.message
                    customMessages.DEFAULT_MESSAGE.response    = filme

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

// Função para atualizar um filme existente
const atualizarFilme = async function (filme, id, contentType) {
    // Cria uma cópia dos JSON's do arquivo de configurações de mensagens
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        // Valida o tipo de dado recebido
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            // Chama a função que valida a existência e os atributos do filme
            let buscarFilmeResult = await buscarFilme(id)

            // Valida o boolean retornado
            if (buscarFilmeResult.status) {
                // Chama a função que valida os atributos
                let validar = await validarDados(filme)

                // Retorna um JSON de erro caso algum atributo seja inválido.
                // Caso não, o mesmo retorna false (sem erros)
                if (!validar) {
                    // Adiciona o id ao objeto filme
                    filme.id = Number(id)

                    // Encaminha os dados do filme ao DAO para atualização no database
                    let result = await filmeDAO.updateFilme(await tratarDados(filme))

                    if (result) {
                        customMessages.DEFAULT_MESSAGE.status      = customMessages.SUCCESS_UPDATED_ITEM.status
                        customMessages.DEFAULT_MESSAGE.status_code = customMessages.SUCCESS_UPDATED_ITEM.status_code
                        customMessages.DEFAULT_MESSAGE.message     = customMessages.SUCCESS_UPDATED_ITEM.message
                        customMessages.DEFAULT_MESSAGE.response    = filme

                        return customMessages.DEFAULT_MESSAGE // status-code: 200
                    } else {
                        return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
                    }
                } else {
                    return validar // status-code: 400 (atributo)
                }
            } else {
                return buscarFilmeResult // status-code: 400 (id) ou 404 (not found)
            }
        } else {
            return customMessages.ERROR_CONTENT_TYPE // status-code: 415
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

// Função para retornar todos os filmes existentes
const listarFilme = async function () {
    // Cria uma cópia dos JSON's do arquivo de configurações de mensagens
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        // Chama a função do DAO para retornar a lista de filmes do database
        let result = await filmeDAO.selectAllFilme()

        // Validação para verificar se o DAO processou o script no database
        if (result) {
            // Validação para verificar se o conteúdo do Array tem dados de retorno
            if (result.length > 0) {
                customMessages.DEFAULT_MESSAGE.status          = customMessages.SUCCESS_RESPONSE.status
                customMessages.DEFAULT_MESSAGE.status_code     = customMessages.SUCCESS_RESPONSE.status_code
                customMessages.DEFAULT_MESSAGE.response.count  = result.length
                customMessages.DEFAULT_MESSAGE.response.filmes = result

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

// Função para retornar um filme filtrado pelo id
const buscarFilme = async function (id) {
    // Cria uma cópia dos JSON's do arquivo de configurações de mensagens
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        // Validação da variável id
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessages.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessages.ERROR_BAD_REQUEST // status-code: 400
        } else {
            // Chama a função do DAO para retornar o filme filtrado pelo id
            let result = await filmeDAO.selectByIdFilme(id)

            // Validação para verificar se o DAO processou o script no database
            if (result) {
                // Verificação se há item dentro do Array
                if (result.length > 0) {
                    customMessages.DEFAULT_MESSAGE.status         = customMessages.SUCCESS_RESPONSE.status
                    customMessages.DEFAULT_MESSAGE.status_code    = customMessages.SUCCESS_RESPONSE.status_code
                    customMessages.DEFAULT_MESSAGE.response.filme = result

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

// Função para excluir um filme
const excluirFilme = async function (id) {
    // Cria uma cópia dos JSON's do arquivo de configurações de mensagens
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    try {
        // Chama a função que valida a existência e os atributos do filme
        let buscarFilmeResult = await buscarFilme(id)

        // Valida o boolean retornado
        if (buscarFilmeResult.status) {
            // Encaminha o id do filme que será excluído do database ao DAO
            let result = await filmeDAO.deleteFilme(id)

            if (result) {
                return customMessages.SUCCESS_DELETED_ITEM // status-code: 200
            } else {
                return customMessages.ERROR_INTERNAL_SERVER_MODEL // status-code: 500 (model)
            }
        } else {
            return buscarFilmeResult // status-code: 400 (id) ou 404 (not found)
        }
    } catch (error) {
        return customMessages.ERROR_INTERNAL_SERVER_CONTROLLER // status-code: 500 (controller)
    }
}

// Função para validar os dados de cadastro do filme
const validarDados = async function (filme) {
    // Cria uma cópia dos JSON's do arquivo de configurações de mensagens
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (filme.nome == undefined || filme.nome == '' || filme.nome == null || filme.nome.length > 80) {
        customMessages.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
    } else if (filme.sinopse == undefined || filme.sinopse == '' || filme.sinopse == null) {
        customMessages.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDA'
    } else if (filme.capa == undefined || filme.capa == '' || filme.capa == null || filme.capa.length > 255) {
        customMessages.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDA'
    } else if (filme.data_lancamento == undefined || filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento.length != 10) {
        customMessages.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDA'
    } else if (filme.duracao == undefined || filme.duracao == '' || filme.duracao == null || filme.duracao.length < 5) {
        customMessages.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDA'
    } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5) {
        customMessages.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
    } else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        customMessages.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDA'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

// Função para tratamento de dados
const tratarDados = async function (filme) {
    // Trata se os dados possuem aspas simples (')
    filme.nome            = filme.nome.replaceAll("'", "")
    filme.sinopse         = filme.sinopse.replaceAll("'", "")
    filme.capa            = filme.capa.replaceAll("'", "")
    filme.data_lancamento = filme.data_lancamento.replaceAll("'", "")
    filme.duracao         = filme.duracao.replaceAll("'", "")
    filme.valor           = filme.valor.replaceAll("'", "")
    filme.avaliacao       = filme.avaliacao.replaceAll("'", "")

    return filme
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}