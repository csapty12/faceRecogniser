const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt");

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

database
  .select("*")
  .from("login")
  .then(data => {
    console.log(data);
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
  database
    .select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return database
          .select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then(user => res.send(user[0]))
          .catch(() => res.status(400).json("unable to fetch user"));
      }
      return res.status(400).json("username and password mismatch");
    })
    .catch(() => res.status(400).json("username and password mismatch"));
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 0);

  database
    .transaction(trx => {
      trx
        .insert({
          hash: hash,
          email: email
        })
        .into("login")
        .returning("email")
        .then(loginEmail => {
          return trx("users")
            .returning("*")
            .insert({ name: name, email: loginEmail[0], joined: new Date() })
            .then(user => {
              return res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(() => res.status(400).json("unable to register"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  database
    .select("*")
    .from("users")
    .where("id", id)
    .then(user => {
      if (user.length) {
        return res.json(user[0]);
      }
      return res.status(400).json("no user found");
    });
});

app.listen(3002, () => {
  console.log("app deployed on port 3002");
});
