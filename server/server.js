'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('./config/env');
const fs = require('fs');
const https = require('https');
const path = require('path');

// Conexão com o banco de dados com tratamento de erro
mongoose.connect(env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Rotas
const router = express.Router();
app.use('/api', router);

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

// Importação das rotas
const auth = require('./routes/auth');
app.use('/auth', auth.router || auth);

const price = require('./routes/price');
app.use('/api/price', price.router || price);

const suggestions = require('./routes/suggestions');
app.use('/api/suggestions', suggestions.router || suggestions);

const bot = require('./routes/bot');
app.use('/api/bot', bot.router || bot);

const keyPath = path.join(__dirname, 'config', 'easytrage-key.pem');
const certPath = path.join(__dirname, 'config', 'easytrage-cert.pem');
const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
};

const port = process.env.PORT || 10000;
app.listen(port, "0.0.0.0", () => {
  console.log(`API rodando em http na porta ${port}`);
});
