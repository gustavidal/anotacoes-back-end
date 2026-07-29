// Import do express
const express = require('express')

// Import do body-parser
const bodyParser = require('body-parser')

// Permitindo a utilização do JSON na body das requisições
const bodyParserJSON = bodyParser.json()

// Criando um objeto de rota para os endpoints
const router = express.Router()

// Import da controller de sexo
const controllerSexo = require('../controller/sexo/controller_sexo.js')

router.post('/v1/senai/locadora/sexo', bodyParserJSON, async function (request, response) {
    let dados       = request.body
    let contentType = request.headers['content-type']
    let result      = await controllerSexo.inserirNovoSexo(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/v1/senai/locadora/sexo', async function (request, response) {
    let result = await controllerSexo.listarSexo()

    response.status(result.status_code)
    response.json(result)
})

router.get('/v1/senai/locadora/sexo/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerSexo.buscarSexo(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/v1/senai/locadora/sexo/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id          = request.params.id
    let dados       = request.body
    let result      = await controllerSexo.atualizarSexo(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/v1/senai/locadora/sexo/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerSexo.excluirSexo(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router