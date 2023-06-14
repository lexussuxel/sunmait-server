const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./db")
const routes = require("./routes/index");
const models = require('./models/models')
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.static("./img.png"));

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(process.env.PORT || 4200, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT || 4200}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
