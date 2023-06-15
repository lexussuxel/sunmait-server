const Router = require("express");
const user = require("../controllers/user");

const router = new Router();

router.post("/login", user.signIn);
router.post("/signup", user.signInValidation ,user.signUp)
router.get("/refresh", user.refresh)


module.exports = router;
