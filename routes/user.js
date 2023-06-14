const Router = require("express");
const user = require("../controllers/user");

const router = new Router();

router.post("/auth", user.authentification);

module.exports = router;
