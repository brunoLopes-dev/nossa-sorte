const express = require('express');
const DrawController = require('../controllers/DrawController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Draw
 *   description: Gerenciamento de sorteios
 */

/**
 * @swagger
 * /draw/{id}:
 *   post:
 *     summary: Realiza o sorteio de uma rifa
 *     tags: [Draw]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da rifa a ser sorteada
 *     responses:
 *       200:
 *         description: Sorteio realizado com sucesso
 *       404:
 *         description: Rifa não encontrada
 *       500:
 *         description: Erro ao realizar sorteio
 */

router.post('/:id', authenticate, DrawController.drawRaffle);

module.exports = router;
