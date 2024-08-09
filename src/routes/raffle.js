const express = require('express');
const RaffleController = require('../controllers/RaffleController');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router.post('/create', authenticate, RaffleController.createRaffle);
router.put('/:id', authenticate, RaffleController.updateRaffle);
router.delete('/:id', authenticate, RaffleController.deleteRaffle);
router.get('/:id', RaffleController.getRaffleById);
router.get('/', RaffleController.getAllAvailableRaffles);

module.exports = router;
