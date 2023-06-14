const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.static("./img.png"));

const start = () => {
  try {
    app.listen("4200", () => {
      console.log(`Server is running at http://localhost:${4200}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
