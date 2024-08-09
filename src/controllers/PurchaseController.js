const Ticket = require('../models/Ticket');
const Purchase = require('../models/Purchase');
const Raffle = require('../models/Raffle');
const generateUniqueTicketNumber = require('../utils/ticketNumberGenerator');

const PurchaseController = {

    purchaseTicket: async (req, res) => {
        const { raffleId, quantity } = req.body;
        const userId = req.userId;

        try {
            const raffle = await Raffle.findByPk(raffleId);
            if (!raffle || raffle.quantity < quantity) {
                return res.status(400).json({ message: 'Rifa não encontrada ou bilhetes insuficientes' });
            }

            const tickets = [];
            for (let i = 0; i < quantity; i++) {
                const ticketNumber = generateUniqueTicketNumber();
                const ticket = await Ticket.create({
                    user_id: userId,
                    raffle_id: raffleId,
                    quantity: 1,
                    ticket_number: ticketNumber
                });
                tickets.push(ticket);
            }

            raffle.quantity -= quantity;
            await raffle.save();

            const totalAmount = raffle.price * quantity;
            const purchase = await Purchase.create({
                user_id: userId,
                raffle_id: raffleId,
                quantity,
                total_amount: totalAmount
            });

            res.status(201).json({
                message: 'Compra realizada com sucesso',
                tickets,
                purchase
            });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao processar compra', error });
        }
    }
};

module.exports = PurchaseController;
