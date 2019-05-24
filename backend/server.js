const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let db = {
  users: [
    {
      id: "1",
      name: "test1",
      email: "test1",
      password: "test1",
      joined: new Date()
    },
    {
      id: "2",
      name: "test2",
      email: "test2",
      password: "test2",
      joined: new Date()
    }
  ]
};
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json(db.users);
});

app.post("/signin", (req, res) => {
  if (
    db.users[0].email === req.body.email &&
    db.users[0].email === req.body.password
  ) {
    return res.json("success");
  }
  return res.status(404).json("user not found");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  db.users.push({
    id: "3",
    name: name,
    email: email,
    password: password,
    joined: new Date()
  });
  return res.json(db.users[db.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.users.forEach(user => {
    if (user.id === id) {
      return res.json(user);
    }
  });
  return res.status(404).json("no user found");
});
app.listen(3000, () => {
  console.log("app deployed on port 3000");
});
