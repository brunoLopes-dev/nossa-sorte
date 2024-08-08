const express = require('express');
const router = express.Router();
const raffleController = require('../controllers/raffleController');
const authenticate = require('../middlewares/authenticate');

router.post('/buy', authenticate, raffleController.buyRaffleTicket);

module.exports = router;
