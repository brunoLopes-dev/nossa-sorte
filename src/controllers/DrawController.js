const Raffle = require('../models/Raffle');
const Purchase = require('../models/Purchase');
const Ticket = require('../models/Ticket');
const User = require('../models/User');

const DrawController = {
    drawRaffle: async (req, res) => {
        const { id } = req.params;

        try {
            const raffle = await Raffle.findByPk(id, {
                include: {
                    model: Purchase,
                    include: {
                        model: Ticket
                    }
                }
            });

            if (!raffle) {
                return res.status(404).json({ message: 'Rifa não encontrada' });
            }

            const tickets = raffle.Purchases.reduce((acc, purchase) => {
                return acc.concat(purchase.Tickets);
            }, []);

            if (tickets.length === 0) {
                return res.status(400).json({ message: 'Nenhum bilhete foi vendido para esta rifa' });
            }

            const winningTicket = tickets[Math.floor(Math.random() * tickets.length)];

            const winner = await User.findByPk(winningTicket.user_id);

            res.status(200).json({
                message: 'Sorteio realizado com sucesso',
                winner: {
                    user_id: winner.id,
                    name: winner.name,
                    email: winner.email,
                    ticket_number: winningTicket.ticket_number
                }
            });
        } catch (error) {
            console.error('Erro ao realizar sorteio:', error);
            res.status(500).json({ message: 'Erro ao realizar sorteio', error });
        }
    }
};

module.exports = DrawController;
