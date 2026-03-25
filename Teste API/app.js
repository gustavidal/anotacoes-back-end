const express = require('express')
const app = express()

const funcoes = require('./modulo/funcoes.js')

app.use(express.json())

// Lista de estados
app.get('/estados', (req, res) => {
    res.json(funcoes.getListaDeEstados())
})

// Estados por região
app.get('/regiao/:nome', (req, res) => {
    const dados = funcoes.getEstadosRegiao(req.params.nome)

    if (dados)
        res.json(dados)
    else
        res.status(404).json({ erro: 'Região não encontrada' })
})

// Capitais do Brasil
app.get('/capitais', (req, res) => {
    res.json(funcoes.getCapitalPais())
})

/*
    ⚠️ ROTAS /estado (ORDEM IMPORTA)
*/

// Cidades (mais específica)
app.get('/estado/:uf/cidades', (req, res) => {
    const dados = funcoes.getCidades(req.params.uf)

    if (dados)
        res.json(dados)
    else
        res.status(404).json({ erro: 'Estado não encontrado' })
})

// Capital do estado
app.get('/estado/capital/:uf', (req, res) => {
    const dados = funcoes.getCapitalEstado(req.params.uf)

    if (dados)
        res.json(dados)
    else
        res.status(404).json({ erro: 'Estado não encontrado' })
})

// Dados do estado (GENÉRICA - sempre por último)
app.get('/estado/:uf', (req, res) => {
    const dados = funcoes.getDadosEstado(req.params.uf)

    if (dados)
        res.json(dados)
    else
        res.status(404).json({ erro: 'Estado não encontrado' })
})

// Servidor
app.listen(3001, () => {
    console.log('API rodando 🚀')
})