const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gerenciamento de autenticação
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               cpf:
 *                 type: number
 *               birthdate:
 *                 type: string
 *               phone_number:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       500:
 *         description: Erro ao registrar o usuário
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Realiza o logout do usuário
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

module.exports = router;
