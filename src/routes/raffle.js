const express = require('express');
const RaffleController = require('../controllers/RaffleController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Raffles
 *   description: API para gerenciamento de rifas
 */

/**
 * @swagger
 * /raffle/create:
 *   post:
 *     summary: Cria uma nova rifa
 *     tags: [Raffles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Rifa criada com sucesso
 *       500:
 *         description: Erro ao criar a rifa
 */

/**
 * @swagger
 * /raffle/{id}:
 *   get:
 *     summary: Busca uma rifa pelo ID
 *     tags: [Raffles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da rifa a ser buscada
 *     responses:
 *       200:
 *         description: Rifa encontrada com sucesso
 *       404:
 *         description: Rifa não encontrada
 */

/**
 * @swagger
 * /raffle:
 *   get:
 *     summary: Lista todas as rifas disponíveis
 *     tags: [Raffles]
 *     responses:
 *       200:
 *         description: Rifas listadas com sucesso
 *       404:
 *         description: Nenhuma rifa disponível encontrada
 */

/**
 * @swagger
 * /raffle/{id}:
 *   put:
 *     summary: Atualiza uma rifa existente
 *     tags: [Raffles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da rifa a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Rifa atualizada com sucesso
 *       404:
 *         description: Rifa não encontrada
 *       500:
 *         description: Erro ao atualizar a rifa
 */

/**
 * @swagger
 * /raffle/{id}:
 *   delete:
 *     summary: Deleta uma rifa existente
 *     tags: [Raffles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da rifa a ser deletada
 *     responses:
 *       200:
 *         description: Rifa deletada com sucesso
 *       404:
 *         description: Rifa não encontrada
 *       500:
 *         description: Erro ao deletar a rifa
 */

router.post('/create', authenticate, RaffleController.createRaffle);
router.put('/:id', authenticate, RaffleController.updateRaffle);
router.delete('/:id', authenticate, RaffleController.deleteRaffle);
router.get('/:id', RaffleController.getRaffleById);
router.get('/', RaffleController.getAllAvailableRaffles);

module.exports = router;
