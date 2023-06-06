const Router = require("express");
const userRouter = require("./user");
const cardsRouter = require("./cards");
const router = new Router();

router.use("/user", userRouter);
router.use("/cards", cardsRouter);

module.exports = router;
