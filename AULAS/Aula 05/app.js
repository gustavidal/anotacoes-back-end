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
    response.status(200)
    response.json({
        "message": "Abaixo está listado todas as rotas desta API",
        "rotas": [
            "/v1/senai/estados",
            "/v1/senai/dados/estado/:uf",
            "/v1/senai/capital/estado/:uf",
            "/v1/senai/estados/regiao/:regiao",
            "/v1/senai/estados/capital/pais/brasil",
            "/v1/senai/cidades/estado/:uf"
        ]
    })
})

// Endpoint para listar os estados
// Retorna uma lista da sigla de todos os estados do Brasil
app.get('/v1/senai/estados', function (request, response) {
    let estados = estadosCidades.getListaDeEstados()
    response.status(200) // Requisição bem sucedida
    response.json(estados)
})

// Retorna os dados gerais filtrados pela sigla de um estado
app.get('/v1/senai/dados/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let estado = estadosCidades.getDadosEstado(sigla)
    if (estado) {
        response.status(200)
        response.json(estado)
    } else {
        response.status(404) // Requisição mal sucedida
        response.json({ "message": "Nenhum estado foi encontrado." })
    }
})

// Retorna os dados da capital filtrados pela sigla de um estado
app.get('/v1/senai/capital/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let estado = estadosCidades.getCapitalEstado(sigla)
    if (estado) {
        response.status(200)
        response.json(estado)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum estado foi encontrado." })
    }
})

// Retorna os estados filtrados pela região
app.get('/v1/senai/estados/regiao/:regiao', function (request, response) {
    let regiao = request.params.regiao
    let estados = estadosCidades.getEstadosRegiao(regiao)
    if (estados) {
        response.status(200)
        response.json(estados)
    } else {
        response.status(404)
        response.json({ "message": "Nenhuma região foi encontrada." })
    }
})

// Retorna os estados que são/foram capitais do Brasil
app.get('/v1/senai/estados/capital/pais/brasil', function (request, response) {
    let capitais = estadosCidades.getCapitalPais()
    response.status(200)
    response.json(capitais)
})

// Retorna as cidades filtadas pela sigla de um estado
app.get('/v1/senai/cidades/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let cidades = estadosCidades.getCidades(sigla)
    if (cidades) {
        response.status(200)
        response.json(cidades)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum estado foi encontrado." })
    }
})

// Iniciar a API
app.listen(8080, function () {
    //       └─ porta padrão, ou 80
    console.log('API aguardando novas requisições...')
})