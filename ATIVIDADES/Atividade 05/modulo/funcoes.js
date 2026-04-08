/******************************************************************************************
 * Objetivo: Arquivo responsável pelas funções de busca ao arquivo de contatos do WhatsApp.
 * Data: 08/04/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
******************************************************************************************/

let arquivo = require('./contatos.js')
const contatos = arquivo.contatos['whats-users']

const getDadosGerais = function () {
    return { contatos }
}

const getDadosUsuario = function (telefone) {
    let dados = {}

    for (let contato of contatos) {
        if (contato.number === String(telefone)) {
            dados.nome               = contato.account
            dados.nickname           = contato.nickname
            dados.foto               = contato['profile-image']
            dados.numero             = contato.number
            dados.background         = contato.background
            dados.dados_conta = {}
            dados.dados_conta.inicio = contato['created-since'].start
            dados.dados_conta.fim    = contato['created-since'].end
        }
    }

    if (dados.numero != telefone)
        return false

    return dados
}

// console.log(getDadosGerais())
// console.table(getDadosUsuario('fbhn'))