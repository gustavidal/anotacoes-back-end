/***********************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de estados e cidades 
 * Data: 01/04/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
***********************************************************************************/

/*****************************************************************************************************************
 * Para configurar a API:
 *  Instalar o EXPRESS -> npm install express --save
 *                                     │         └─ serve para registrar o pacote e versão em que foi instalado
 *                                     └─ dependência para configurar e utilizar o protocolo HTTP para criar a API
 *  Instalar o CORS    -> npm install cors --save
 *                                     └─ dependência para configurar as permissões de acesso à API
*****************************************************************************************************************/

// Import das dependências para criar a API
const express = require('express')
const cors = require('cors')

// Criando um objeto do express para criar a API
const app = express()

// Configurações do CORS da API
const corsOptions = {
    origin: ['*'],                                     // Configuração de origem da requisição (IP ou domínio)
    methods: 'GET',                                    // Configuração dos verbos que serão utilizados na API
    allowedHeaders: ['Content-type', 'Authorization']  // Configurações de permissões
    //                    │               └─ Autorização de acesso
    //                    └─ Tipo de dados
}

// Aplica as configurações no CORS no app (EXPRESS)
app.use(cors(corsOptions))

// Import do arquivos de funções
const estadosCidades = require('./modulo/funcoes.js')

app.get('/docs', function (request, response) {
    response.json({
        "message": "Abaixo está listado todas as rotas desta API",
        "rotas": [
            "/v1/senai/estados",
            "/v1/senai/dados/estado/:uf",
            "/v1/senai/capital/estado/:uf",
            "/v1/senai/estados/regiao/:regiao",
            "/v1/senai/capital/pais",
            "/v1/senai/cidades/estado/:uf"
        ]
    })
})

// Endpoint para listar os estados
app.get('/v1/senai/estados', function (request, response) {
    let estados = estadosCidades.getListaDeEstados()
    response.json(estados)
    response.status(200) // Requisição bem sucedida
})

app.get('/v1/senai/dados/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let estado = estadosCidades.getDadosEstado(sigla)
    if (estado) {
        response.json(estado)
        response.status(200)
    } else {
        response.json({ "message": "Nenhum estado foi encontrado." })
        response.status(404) // Requisição mal sucedida
    }
})

app.get('/v1/senai/capital/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let estado = estadosCidades.getCapitalEstado(sigla)
    if (estado) {
        response.json(estado)
        response.status(200)
    } else {
        response.json({ "message": "Nenhum estado foi encontrado." })
        response.status(404)
    }
})

app.get('/v1/senai/estados/regiao/:regiao', function (request, response) {
    let regiao = request.params.regiao
    let estados = estadosCidades.getEstadosRegiao(regiao)
    if (estados) {
        response.json(estados)
        response.status(200)
    } else {
        response.json({ "message": "Nenhuma região foi encontrada." })
        response.status(404)
    }
})

app.get('/v1/senai/capital/pais', function (request, response) {
    let capitais = estadosCidades.getCapitalPais()
    response.json(capitais)
    response.status(200)
})

app.get('/v1/senai/cidades/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let cidades = estadosCidades.getCidades(sigla)
    if (cidades) {
        response.json(cidades)
        response.status(200)
    } else {
        response.json({ "message": "Nenhum estado foi encontrado." })
        response.status(404)
    }
})

// Iniciar a API
app.listen(8080, function () {
    //       └─ porta padrão, ou 80
    console.log('API aguardando novas requisições...')
})