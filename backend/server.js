const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt");
const register = require("./controller/register");
const signin = require("./controller/signin");
const profile = require("./controller/profile");
const detect = require("./controller/detect");

const database = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "password",
    database: "postgres",
    port: "54322"
  }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return database
    .select("*")
    .from("users")
    .then(data => res.json(data));
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, database, bcrypt);
});
app.post("/register", (req, res) => {
  register.handleRegister(req, res, database, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleGetProfile(req, res, database);
});

app.post("/detect", (req, res) => {
  detect.handleApiCall(req, res);
});

const PORT = process.env.PORT; // PORT=3002 node server.js or remove this and use a static port
app.listen(PORT, () => {
  console.log(`app deployed on port ${PORT}`);
});
