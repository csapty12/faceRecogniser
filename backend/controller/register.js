const handleRegister = (req, res, database, bcrypt) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json("invalid user details");
  }
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
};

module.exports = {
  handleRegister: handleRegister
};
