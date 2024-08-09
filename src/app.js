const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();
app.use(bodyParser.json());

sequelize.sync()
    .then(() => {
        console.log('Modelos sincronizados com o banco de dados');
    })
    .catch(err => {
        console.error('Erro ao sincronizar os modelos com o banco de dados:', err);
    });

// Rotas de autenticação
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API de Rifas está rodando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
