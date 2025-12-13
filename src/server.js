// Importa a API do arquivo app.js
const app = require('./app')

// Inicia o Servidor na porta 3001
app.listen(3001, () => {
    console.log  ('Server Running on port 3001')
})