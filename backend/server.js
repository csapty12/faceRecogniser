const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt");
const register = require("./controller/register");
const signin = require("./controller/signin");
const profile = require("./controller/profile");

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

// database
//   .select("*")
//   .from("login")
//   .then(data => {
//     console.log(data);
//   });
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

app.listen(3002, () => {
  console.log("app deployed on port 3002");
});
