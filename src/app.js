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

// Define uma rota POST para /users
app.post('/users', (req, res) => {

  // Extrai name, email e password do corpo da requisição (req.body)
  const { name, email, password } = req.body

  // Retorna status 201 (Created) e um JSON como resposta
  return res.status(201).json({

    // Mensagem de sucesso
    message: 'User created successfully',

    // Dados do usuário retornados
    // (senha nunca deve ser retornada)
    user: {
      name,
      email
    }
  })
})


// Exporta a aplicação permitindo que seja utilizada em outros arquivos 
module.exports = app