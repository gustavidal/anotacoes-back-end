// Import do express
const express = require('express')

// Import do body-parser
const bodyParser = require('body-parser')

// Permitindo a utilização do JSON na body das requisições
const bodyParserJSON = bodyParser.json()

// Criando um objeto de rota para os endpoints
const router = express.Router()

// Import da controller de nacionalidade
const controllerDiretor = require('../controller/diretor/controller_diretor.js')

router.post('/v1/senai/locadora/diretor', bodyParserJSON, async function (request, response) {
    let dados       = request.body
    let contentType = request.headers['content-type']
    let result      = await controllerDiretor.inserirNovoDiretor(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/v1/senai/locadora/diretor', async function (request, response) {
    let result = await controllerDiretor.listarDiretor()

    response.status(result.status_code)
    response.json(result)
})

router.get('/v1/senai/locadora/diretor/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerDiretor.buscarDiretor(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/v1/senai/locadora/diretor/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id          = request.params.id
    let dados       = request.body
    let result      = await controllerDiretor.atualizarDiretor(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/v1/senai/locadora/diretor/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerDiretor.excluirDiretor(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router