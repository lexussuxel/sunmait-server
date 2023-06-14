const { LOGIN_MOCK } = require("./mockData.module");

class UserController {
  async authentification(req, res, next) {
   
  }

  async signUp(req, res){

  }

  async signIn(req, res){
    const { username, password } = req.body;

    if (username == LOGIN_MOCK.username && password == LOGIN_MOCK.password) {
      return res.json( true );
    }
    return res.status(400).send({message: "incorrect username or password"});
  }
}

module.exports = new UserController();
