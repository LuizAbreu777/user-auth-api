const express = require('express')
const cors = require('cors')

// Cria a aplicação Express
const app = express()

app.use(cors()) // Ativa o CORS para todas as rotas da aplicação
app.use(express.json()) // Permite que a API entenda requisições com corpo em JSON

// Exporta a aplicação permitindo que seja utilizada em outros arquivos 
module.exports = app