const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const raffleRoutes = require('./routes/raffle');
const purchaseRoutes = require('./routes/purchase');
const drawRoutes = require('./routes/draw');

const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use('/draw', drawRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


