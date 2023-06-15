const {User} = require("../models/models")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


function generateJWT(id, username, firstName, lastName, age){
  return jwt.sign({id, username, age, firstName, lastName},
    process.env.SECRET_KEY,
    {
     expiresIn:"24h"
    })
}

function generateRefresh(id, username, firstName, lastName, age){
  return jwt.sign({id, username, age, firstName, lastName},
    process.env.SECRET_KEY_REFRESH,
    {
     expiresIn:"7d"
    })
}


class UserController {

  async signInValidation(req, res, next){
    const {username, password, repPassword, firstName, lastName, age} = req.body;
    let message = "";

    if(password !== repPassword){
      message +="Passwords don't match!";
    }
    if(!password.match(/\d/) || !password.match(/[A-Za-z]/) || password.length < 4){
      message += "Your password is not strong, it should contain 1 letter, 1 number and should contain more than 4 symbols.";
    } 
    if(firstName.length < 3){
      
      message += "First name should be longer then 3 symbols."
    }
    if (lastName.length < 3){
      message += "Last name should be longer then 3 symbols."
    }
    if(+age <= 0){
      message += "Your age cannot be less then 0."
    }
    if(username.length <3){
      message += "Username should be longer then 3 symbols."
    }
    const user = await User.findOne({where: {username}})
    if(user){
      message += "User with such username already exists!"
    }
    if(message.length > 0){
      res.statusMessage = message;
      return res.status(400).send({message})
    }else
      next();
  }


  async signUp(req, res){
    
    const {username, password, firstName, lastName, age} = req.body;
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({username, password:hashPassword, first_name: firstName, age, last_name: lastName})
    const access_token = generateJWT(user.id, user.username, user.first_name, user.last_name, user.age)
    const refresh_token = generateRefresh(user.id, user.username, user.first_name, user.last_name, user.age)
    return res.json({access_token, refresh_token})
  }

  async signIn(req, res){
    const { username, password } = req.body;
    const user = await User.findOne({where: {username}})
    if(user){
      let comparePassword = await bcrypt.compareSync(password, user.password)
      if(!comparePassword){
        res.statusMessage = "Incorrect password";
        res.status(400).send({message: "Incorrect password"})
      }else {
        const access_token = generateJWT(user.id, user.username, user.first_name, user.last_name, user.age)
        const refresh_token = generateRefresh(user.id, user.username, user.first_name, user.last_name, user.age)
        return res.json({access_token, refresh_token})
      }
    }else{
      res.statusMessage = "User is not found";
      res.status(400).send({message: "User is not found"})
    }
  }

  async refresh(req, res) {
    const { refresh_token } = req.body;
  
    // Token not found
    if (!refresh_token) {
      return res.status(401).json({
        error: 'Authorization failed',
      });
    }
  
    // If the refresh token does not exist in the array
  
    try {
      const jwtData = jwt.verify(
        refresh_token,
        process.env.SECRET_KEY_REFRESH,
      );
  
      const user = jwtData;
  
      // Generate a new access token by using refresh token's payload if not expired
      const accessToken = generateJWT(user.id, user.username, user.first_name, user.last_name, user.age)
      return res.json({ accessToken });
    } catch (error) {
      // Remove the expired refresh tokens = require(the arra)y
      return res.status(403).json({
        error: 'Refresh token expired',
      });
    }
  }

  
}

module.exports = new UserController();
