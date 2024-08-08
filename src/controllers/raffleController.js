const Raffle = require('../models/Raffle');
const RaffleTicket = require('../models/RaffleTicket');
const generateRaffleNumber = require('../utils/generateRaffleNumber');

exports.buyRaffleTicket = async (req, res) => {
  const { raffleId, userId, quantity } = req.body;

  if (quantity < 10) {
    return res.status(400).json({ message: 'O número mínimo de tíquetes é 10.' });
  }

  try {
    console.log('Buscando rifa com ID:', raffleId);
    const raffle = await Raffle.findByPk(raffleId);
    if (!raffle) {
      console.log('Rifa não encontrada com ID:', raffleId);
      return res.status(404).json({ message: 'Rifa não encontrada.' });
    }

    console.log('Rifa encontrada:', raffle);

    const existingTickets = await RaffleTicket.findAll({
      where: { raffleId },
      attributes: ['number'],
    });
    const existingNumbers = existingTickets.map(ticket => ticket.number);

    const raffleTickets = [];
    for (let i = 0; i < quantity; i++) {
      const raffleNumber = generateRaffleNumber(existingNumbers);
      existingNumbers.push(raffleNumber);

      const raffleTicket = await RaffleTicket.create({
        number: raffleNumber,
        raffleId,
        userId,
        status: 'purchased',
      });

      raffleTickets.push(raffleTicket);
    }

    res.status(201).json(raffleTickets);
  } catch (err) {
    console.error('Erro ao comprar rifa:', err);
    res.status(500).json({ message: 'Erro ao comprar rifa.', error: err.message });
  }
};
