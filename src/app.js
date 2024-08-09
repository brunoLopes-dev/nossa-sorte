const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const raffleRoutes = require('./routes/raffle');
const purchaseRoutes = require('./routes/purchase');

const app = express();
app.use(bodyParser.json());

sequelize.sync()
    .then(() => {
        console.log('Modelos sincronizados com o banco de dados');
    })
    .catch(err => {
        console.error('Erro ao sincronizar os modelos com o banco de dados:', err);
    });

// Rotas da aplicação
app.use('/auth', authRoutes);
app.use('/raffle', raffleRoutes);
app.use('/purchase', purchaseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


