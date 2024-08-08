require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const app = express();

//Models
const User = require('./models/User');
const Raffle = require('./models/Raffle');
const RaffleTicket = require('./models/RaffleTicket');

// Rotas
const userRoutes = require('./routes/userRoutes');
const raffleRoutes = require('./routes/raffleRoutes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão e sicronização com o BD
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida.');
    return sequelize.sync();
  })
  .then(() => console.log('Modelos sincronizados com o banco de dados.'))
  .catch(err => console.error('Não foi possível conectar ao banco de dados:', err));

// Uso das Rotas
app.use('/api/users', userRoutes);
app.use('/api/raffles', raffleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
