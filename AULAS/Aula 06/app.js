// Import das dependências para criar a API
const express = require('express')
const cors = require('cors')

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



// Import do arquivo de rotas da atividade
const atividadeRouter = require('./routes/atividade.router.js')
app.use('/v1/senai/locadora/atividade', cors(), atividadeRouter)

// Import do arquivo de rotas do ator
const atorRouter = require('./routes/ator.router.js')
app.use('/v1/senai/locadora/ator', cors(), atorRouter)

// Import do arquivo de rotas da classificação
const classificacaoRouter = require('./routes/classificacao.router.js')
app.use('/v1/senai/locadora/classificacao', cors(), classificacaoRouter)

// Import do arquivo de rotas do diretor
const diretorRouter = require('./routes/diretor.router.js')
app.use('/v1/senai/locadora/diretor', cors(), diretorRouter)

// Import do arquivo de rotas do filme
const filmeRouter = require('./routes/filme.router.js')
app.use('/v1/senai/locadora/filme', cors(), filmeRouter)

// Import do arquivo de rotas do foto
const fotoRouter = require('./routes/foto.router.js')
app.use('/v1/senai/locadora/foto', cors(), fotoRouter)

// Import do arquivo de rotas do gênero cênico
const generoRouter = require('./routes/genero.router.js')
app.use('/v1/senai/locadora/genero', cors(), generoRouter)

// Import do arquivo de rotas da nacionalidade
const nacionalidadeRouter = require('./routes/nacionalidade.router.js')
app.use('/v1/senai/locadora/nacionalidade', cors(), nacionalidadeRouter)

// Import do arquivo de rotas da sexo
const sexoRouter = require('./routes/sexo.router.js')
app.use('/v1/senai/locadora/sexo', cors(), sexoRouter)



// Iniciar a API
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})