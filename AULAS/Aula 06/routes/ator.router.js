// Import do express
const express = require('express')

// Import do body-parser
const bodyParser = require('body-parser')

// Permitindo a utilização do JSON na body das requisições
const bodyParserJSON = bodyParser.json()

// Criando um objeto de rota para os endpoints
const router = express.Router()

// Import da controller de ator
const controllerAtor = require('../controller/ator/controller_ator.js')

router.post('/v1/senai/locadora/ator', bodyParserJSON, async function (request, response) {
    let dados       = request.body
    let contentType = request.headers['content-type']
    let result      = await controllerAtor.inserirNovoAtor(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/v1/senai/locadora/ator', async function (request, response) {
    let result = await controllerAtor.listarAtor()

    response.status(result.status_code)
    response.json(result)
})

router.get('/v1/senai/locadora/ator/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerAtor.buscarAtor(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/v1/senai/locadora/ator/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id          = request.params.id
    let dados       = request.body
    let result      = await controllerAtor.atualizarAtor(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/v1/senai/locadora/ator/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerAtor.excluirAtor(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router