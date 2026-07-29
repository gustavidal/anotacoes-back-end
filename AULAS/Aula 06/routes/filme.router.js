// Import do express
const express = require('express')

// Import do body-parser
const bodyParser = require('body-parser')

// Permitindo a utilização do JSON na body das requisições
const bodyParserJSON = bodyParser.json()

// Criando um objeto de rota para os endpoints
const router = express.Router()

// Import da controller de filme
const controllerFilme = require('../controller/filme/controller_filme.js')

router.post('/v1/senai/locadora/filme', bodyParserJSON, async function (request, response) {
    let dados       = request.body
    let contentType = request.headers['content-type']
    let result      = await controllerFilme.inserirNovoFilme(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

router.get('/v1/senai/locadora/filme', async function (request, response) {
    let result = await controllerFilme.listarFilme()
    
    response.status(result.status_code)
    response.json(result)
})

router.get('/v1/senai/locadora/filme/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerFilme.buscarFilme(id)
    
    response.status(result.status_code)
    response.json(result)
})

router.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id          = request.params.id
    let dados       = request.body
    
    let result      = await controllerFilme.atualizarFilme(dados, id, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

router.delete('/v1/senai/locadora/filme/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerFilme.excluirFilme(id)
    
    response.status(result.status_code)
    response.json(result)
})

module.exports = router