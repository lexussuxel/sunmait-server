const Router = require("express");
const cards = require("../controllers/cards");
const authMiddleware = require('../middleware/auth')

const router = new Router();

router.get("/", authMiddleware ,cards.getItems);

module.exports = router;
