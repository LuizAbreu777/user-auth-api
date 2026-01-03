const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')

// Array que simula um banco de dados em memória
// Os dados ficam aqui enquanto o servidor estiver rodando, ou seja, quando o servidor reiniciar → array zera
const users = []

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

// Define uma rota POST para criar usuários
app.post('/users', async (req, res) => {

  // Extrai name, email e password do corpo da requisição (req.body)
  const { name, email, password } = req.body

  // Valida se name, email e password foram fornecidos
  // O operador ! (negação) verifica se o valor é "falsy" (nulo, indefinido, vazio, etc.)
    if (!name || !email || !password) {

      return res.status(400).json ({
        error: 'Name, email and password are required'
      })
    }

    // Gera um hash da senha utilizando bcrypt
    // 10 é o número de "salt rounds" (complexidade do hash)
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      id: users.length + 1, 
      name,
      email,
      password: hashedPassword
    }

    users.push (newUser)

  // Se passar da validação retorna status 201 (Created) e um JSON como resposta
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

app.post('/login', async (req, res) => {

  // extrai email e senha do corpo da requisição
  const {email, password} = req.body

  // Valida se email e senha foram enviados
  if (!email || !password) {
    return res.status(400).json ({
      message: 'email and password are required'
    })
  }

  // Busca no "banco" um usuário com email indformado
  const user = users.find(user => user.email === email)

  // Se usuário não for encontrado, retorna erro

  if (!user){

    return res.status(401).json ({
      message: 'Invalid credentials'
    })
  }
  
  // Compara a senha informada com o hash armazenado

  const passwordMatch = await bcrypt.compare(password, user.password) 

  if (!passwordMatch)  {
    return res.status(401).json({
      message: "Invalid credentials"
    })
  }

  // Login Bem-sucessido
  
  return res.status(200).json ({
    message: "Login successful",
    user:{
    id: user.id,
    name: user.name,
    email: user.email
    }
  })
})


// Exporta a aplicação permitindo que seja utilizada em outros arquivos 
module.exports = app