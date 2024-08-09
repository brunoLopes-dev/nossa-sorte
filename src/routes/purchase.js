const express = require('express');
const PurchaseController = require('../controllers/PurchaseController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Purchase
 *   description: Gerenciamento de compras
 */

/**
 * @swagger
 * /purchase:
 *   post:
 *     summary: Compra bilhetes para uma rifa
 *     tags: [Purchase]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               raffleId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Compra realizada com sucesso
 *       400:
 *         description: Erro nos dados enviados
 *       500:
 *         description: Erro ao processar a compra
 */

router.post('/', authenticate, PurchaseController.purchaseTicket);

module.exports = router;
