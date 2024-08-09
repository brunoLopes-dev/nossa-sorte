const { Op } = require('sequelize'); 
const Raffle = require('../models/Raffle');


const RaffleController = {

	createRaffle: async (req, res) => {
		const { title, description, quantity, price } = req.body;

        try {
            const raffle = await Raffle.create({
                title,
                description,
                quantity,
                price
            });

            res.status(201).json({ message: 'Rifa criada com sucesso', raffle });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar rifa', error });
        }
    },

	getRaffleById: async (req, res) => {
        const { id } = req.params;

        try {
            const raffle = await Raffle.findByPk(id);

            if (!raffle) {
                return res.status(404).json({ message: 'Rifa não encontrada' });
            }

            res.status(200).json(raffle);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar rifa', error });
        }
    },

    getAllAvailableRaffles: async (req, res) => {
        try {
            const raffles = await Raffle.findAll({
                where: {
                    quantity: {
                        [Op.gt]: 0
                    }
                }
            });

            if (raffles.length === 0) {
                return res.status(404).json({ message: 'Nenhuma rifa disponível encontrada' });
            }

            res.status(200).json(raffles);
        } catch (error) {
            console.error('Erro ao buscar rifas disponíveis:', error);
            res.status(500).json({ message: 'Erro ao buscar rifas disponíveis', error });
        }
    },

    updateRaffle: async (req, res) => {
        const { id } = req.params;
        const { title, description, quantity, price } = req.body;

        try {
            const raffle = await Raffle.findByPk(id);

            if (!raffle) {
                return res.status(404).json({ message: 'Rifa não encontrada' });
            }

            raffle.title = title || raffle.title;
            raffle.description = description || raffle.description;
            raffle.quantity = quantity || raffle.quantity;
            raffle.price = price || raffle.price;

            await raffle.save();

            res.status(200).json({ message: 'Rifa atualizada com sucesso', raffle });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar rifa', error });
        }
    },

    deleteRaffle: async (req, res) => {
        const { id } = req.params;

        try {
            const raffle = await Raffle.findByPk(id);

            if (!raffle) {
                return res.status(404).json({ message: 'Rifa não encontrada' });
            }

            await raffle.destroy();

            res.status(200).json({ message: 'Rifa excluída com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir rifa', error });
        }
    }
};

module.exports = RaffleController;
