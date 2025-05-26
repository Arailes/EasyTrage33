'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('./config/env');
const fs = require('fs');
const https = require('https');
const http = require('http');

// https key/cert setup
const hskey = fs.readFileSync(env.HTTPS_KEY);
const hscert = fs.readFileSync(env.HTTPS_CERT);
const options = { key: hskey, cert: hscert };

const app = express();

const port = process.env.PORT || 10000; // Use PORT do Render, ou 3001 localmente
const httpPort = process.env.PORT || 10001;

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

// Criação do servidor HTTPS
https.createServer(options, app).listen(port, "0.0.0.0", function() {
  console.log(`API rodando em https na porta ${port}`);
});

app.listen(httpPort, "0.0.0.0", () => {
  console.log(`API rodando em http na porta ${httpPort}`);
});
