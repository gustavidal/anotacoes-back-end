// Import das dependências para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Permitindo a utilização do JSON na body das requisições
const bodyParserJSON = bodyParser.json()

// Criando um objeto do express para criar a API
const app = express()

// Configurações do CORS da API
const corsOptions = {
    origin: ['*'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-type', 'Authorization']
}

// Aplica as configurações no CORS no app (EXPRESS)
app.use(cors(corsOptions))



//*************************//
// ENDPOINTS - Tabela "FILME"
//*************************//
const controllerFilme = require('./controller/filme/controller_filme.js')

app.post('/v1/senai/locadora/filme', bodyParserJSON, async function (request, response) {
    // Recebendo o body da requisição
    let dados       = request.body
    
    // Recebendo o tipo de dados da requisição para validação de JSON
    let contentType = request.headers['content-type']
    let result      = await controllerFilme.inserirNovoFilme(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme', async function (request, response) {
    let result = await controllerFilme.listarFilme()
    
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme/:id', async function (request, response) {
    // Recebe o id via parâmetro
    let id     = request.params.id
    let result = await controllerFilme.buscarFilme(id)
    
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id          = request.params.id
    let dados       = request.body
    
    let result      = await controllerFilme.atualizarFilme(dados, id, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/filme/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerFilme.excluirFilme(id)
    
    response.status(result.status_code)
    response.json(result)
})




//**************************//
// ENDPOINTS - Tabela "GÊNERO"
//**************************//
const controllerGenero = require('./controller/genero/controller_genero.js')

app.post('/v1/senai/locadora/genero', bodyParserJSON, async function (request, response) {
    let dados       = request.body
    let contentType = request.headers['content-type']
    let result      = await controllerGenero.inserirNovoGenero(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero', async function (request, response) {
    let result = await controllerGenero.listarGenero()
    
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerGenero.buscarGenero(id)
    
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/genero/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id          = request.params.id
    let dados       = request.body
    let result      = await controllerGenero.atualizarGenero(dados, id, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/genero/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerGenero.excluirGenero(id)
    
    response.status(result.status_code)
    response.json(result)
})



//*********************************//
// ENDPOINTS - Tabela "NACIONALIDADE"
//*********************************//
const controllerNacionalidade = require('./controller/nacionalidade/controller_nacionalidade.js')

app.post('/v1/senai/locadora/nacionalidade', bodyParserJSON, async function (request, response) {
    let dados       = request.body
    let contentType = request.headers['content-type']
    let result      = await controllerNacionalidade.inserirNovaNacionalidade(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/nacionalidade', async function (request, response) {
    let result = await controllerNacionalidade.listarNacionalidade()
    
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/nacionalidade/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerNacionalidade.buscarNacionalidade(id)
    
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/nacionalidade/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id          = request.params.id
    let dados       = request.body
    let result      = await controllerNacionalidade.atualizarNacionalidade(dados, id, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/nacionalidade/:id', async function (request, response) {
    let id     = request.params.id
    let result = await controllerNacionalidade.excluirNacionalidade(id)
    
    response.status(result.status_code)
    response.json(result)
})



//************************//
// ENDPOINTS - Tabela "FOTO"
//************************//
const controllerFoto = require('./controller/foto/controller_foto.js')

app.post('/v1/senai/locadora/foto', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerFoto.inserirNovaFoto(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/foto', async function (request, response) {
    let result = await controllerFoto.listarFoto()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/foto/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerFoto.buscarFoto(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/foto/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body
    let result = await controllerFoto.atualizarFoto(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/foto/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerFoto.excluirFoto(id)

    response.status(result.status_code)
    response.json(result)
})

// Iniciar a API
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})