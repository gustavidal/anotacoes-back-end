/******************************************************************************************
 * Objetivo: Arquivo responsável pelas funções de busca ao arquivo de contatos do WhatsApp.
 * Data: 08/04/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
******************************************************************************************/

let arquivo = require('./contatos.js')
const contatos = arquivo.contatos['whats-users']

const getDados = function () {
    return { contatos }
}

const getDadosUsuario = function (telefone) {
    let dados = {}

    for (let contato of contatos) {
        if (contato.number === String(telefone)) {
            dados.nome = contato.account
            dados.nickname = contato.nickname
            dados.foto = contato['profile-image']
            dados.numero = contato.number
            dados.background = contato.background
            dados.dados_conta = {
                "inicio": contato['created-since'].start,
                "fim": contato['created-since'].end
            }
        }
    }

    if (dados.numero != telefone)
        return false

    return dados
}

const getDadosContatos = function (telefone) {
    let dados = {
        "contatos": []
    }

    for (let usuario of contatos) {
        if (usuario.number === String(telefone)) {
            usuario.contacts.forEach(function (itemContato) {
                dados.contatos.push({
                    "nome": itemContato.name,
                    "foto": itemContato.image,
                    "descricao": itemContato.description
                })
            })
        }
    }

    if (dados.contatos.length == 0)
        return false

    return dados
}

const getMensagensContatos = function (telefone) {
    let dados = {
        "contatos": false
    }

    for (let usuario of contatos) {
        if (usuario.number === String(telefone)) {
            dados.contatos = usuario.contacts
        }
    }

    if (!dados.contatos)
        return false

    return dados
}

const getMensagensContato = function (telefone, nomeContato) {
    let dados = {
        "nome": false,
        "telefone": telefone
    }

    for (let usuario of contatos) {
        if (usuario.number === String(telefone)) {
            usuario.contacts.forEach(function (itemContato) {
                if (itemContato.name == String(nomeContato)) {
                    dados.nome = itemContato.name
                    dados.mensagens = []

                    itemContato.messages.forEach(function (itemMensagem) {
                        dados.mensagens.push({
                            "remetente": itemMensagem.sender,
                            "conteudo": itemMensagem.content,
                            "tempo": itemMensagem.time
                        })
                    })
                }
            })
        }
    }

    if (!dados.nome)
        return false

    return dados
}

function filtrarMensagens(mensagens, busca) {
    if (!busca) return mensagens

    return mensagens.filter(mensagem =>
        String(mensagem.conteudo || "")
            .toLowerCase()
            .includes(busca.toLowerCase())
    )
}