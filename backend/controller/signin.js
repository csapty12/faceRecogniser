const handleSignin = (req, res, database, bcrypt) => {
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
};

module.exports = {
  handleSignin: handleSignin
};
