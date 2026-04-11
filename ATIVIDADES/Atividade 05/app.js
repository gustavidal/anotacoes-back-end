/***********************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto WhatsApp 
 * Data: 11/04/2026 (sábado)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
***********************************************************************/

// Import das dependências para criar a API
const express = require('express')
const cors = require('cors')

// Criando um objeto do express para criar a API
const app = express()

// Configurações do CORS da API
const corsOptions = {
    origin: ['*'],
    methods: 'GET',
    allowedHeaders: ['Content-type', 'Authorization']
}

// Aplica as configurações no CORS no app (EXPRESS)
app.use(cors(corsOptions))

// Import do arquivo de funções
const contatosMensagens = require('./modulo/funcoes.js')

// Endpoint para listar todos os usuários
app.get('/v1/whatsapp/usuarios', function (request, response) {
    let dados = contatosMensagens.getDados()

    response.status(200)
    response.json(dados)
})

// Endpoint para listar um usuário pelo telefone
app.get('/v1/whatsapp/usuarios/:telefone', function (request, response) {
    let telefone = request.params.telefone
    let contato  = contatosMensagens.getDadosUsuario(telefone)

    if (contato) {
        response.status(200)
        response.json(contato)
    } else {
        response.status(404)
        response.json({ "message": "Contato não encontrado." })
    }
})

// Endpoint para listar contatos de um usuário
app.get('/v1/whatsapp/usuarios/:telefone/contatos', function (request, response) {
    let telefone = request.params.telefone
    let contatos = contatosMensagens.getDadosContatos(telefone)

    if (contatos) {
        response.status(200)
        response.json(contatos)
    } else {
        response.status(404)
        response.json({ "message": "Usuário não encontrado ou sem contatos." })
    }
})

// Endpoint para listar todas as mensagens dos contatos de um usuário
app.get('/v1/whatsapp/usuarios/:telefone/contatos/mensagens', function (request, response) {
    let telefone  = request.params.telefone
    let mensagens = contatosMensagens.getMensagensContatos(telefone)

    if (mensagens) {
        response.status(200)
        response.json(mensagens)
    } else {
        response.status(404)
        response.json({ "message": "Usuário não encontrado ou sem mensagens." })
    }
})

// Endpoint para listar mensagens de um contato com possibilidade de filtro (?busca=)
app.get('/v1/whatsapp/usuarios/:telefone/contatos/:nomeContato/mensagens', function (request, response) {
    let telefone    = request.params.telefone
    let nomeContato = request.params.nomeContato
    let busca       = request.query.busca

    let dados       = contatosMensagens.getMensagensContato(telefone, nomeContato)

    if (dados && dados.mensagens) {
        let mensagens = dados.mensagens

        if (busca) {
            mensagens = contatosMensagens.getFiltroDeMensagens(mensagens, busca)
        }

        response.status(200)
        response.json({mensagens})
    } else {
        response.status(404)
        response.json({ "message": "Contato não encontrado." })
    }
})

// Endpoint de documentação da API
app.get('/v1/whatsapp/help', function (request, response) {
    let docAPI = {
        "api-description": "API para manipular dados de contatos e mensagens",
        "date": "2026-04-11",
        "development": "Gustavo Vidal de Abreu",
        "version": 1.0,
        "endpoints": [
            {
                "router1": "/v1/whatsapp/usuarios",
                "description": "Lista todos os usuários"
            },
            {
                "router2": "/v1/whatsapp/usuarios/11987876567",
                "description": "Retorna um usuário pelo telefone"
            },
            {
                "router3": "/v1/whatsapp/usuarios/11987876567/contatos",
                "description": "Lista os contatos de um usuário"
            },
            {
                "router4": "/v1/whatsapp/usuarios/11987876567/contatos/mensagens",
                "description": "Lista todas as mensagens dos contatos"
            },
            {
                "router5": "/v1/whatsapp/usuarios/11987876567/contatos/Ana%20Maria/mensagens",
                "description": "Lista mensagens de um contato (com filtro ?busca=)"
            }
        ]
    }

    response.status(200)
    response.json(docAPI)
})

// Iniciar a API
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})