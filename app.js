const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Outras rotas
app.get('/cozinha', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cozinha.html'));
});

app.get('/entregue', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'entregue.html'));
});

app.get('/motoboy', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'motoboy.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});