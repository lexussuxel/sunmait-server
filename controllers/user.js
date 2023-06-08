const { LOGIN_MOCK } = require("./mockData.module");

class UserController {
  authentification(req, res) {
    const { username, password } = req.body;

    if (username != LOGIN_MOCK.username && password != LOGIN_MOCK.password) {
      return res.json({ username });
    }
    return res.json({ message: "incorrect password or email" });
  }
}

module.exports = new UserController();
