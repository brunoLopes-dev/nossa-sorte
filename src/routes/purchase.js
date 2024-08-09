const express = require('express');
const PurchaseController = require('../controllers/PurchaseController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.post('/', authenticate, PurchaseController.purchaseTicket);

module.exports = router;
