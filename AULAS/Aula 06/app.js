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

// Import das controllers do projeto
const controllerFilme = require('./controller/filme/controller_filme.js')

// ENDPOINTS
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function (request, response) {
    // Recebendo o body da requisição
    let dados = request.body

    // Recebendo o tipo de dados da requisição para validação de JSON
    let contentType = request.headers['content-type']

    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Iniciar a API
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})