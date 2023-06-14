const Router = require("express");
const user = require("../controllers/user");

const router = new Router();

router.post("/login", user.signIn);
router.post("/signup", user.signUp)

module.exports = router;
