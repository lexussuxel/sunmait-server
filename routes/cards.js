const Router = require('express');
const cards = require('../controllers/cards');

const router = new Router();

router.get('/cards', cards.getItems)


module.exports = router;