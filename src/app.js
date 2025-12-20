const express = require('express')
const cors = require('cors')

// Cria a aplicação Express
const app = express()

app.use(cors()) // Ativa o CORS para todas as rotas da aplicação
app.use(express.json()) // Permite que a API entenda requisições com corpo em JSON

// Define uma rota GET no endpoint /health
app.get('/health', (req, res) => {

  // Retorna o status HTTP 200 (OK)
  res.status(200).json({

    // Corpo da resposta em JSON
    status: 'ok',
    message: 'APP is running'
  })
})

// Exporta a aplicação permitindo que seja utilizada em outros arquivos 
module.exports = app