const handleGetProfile = (req, res, database) => {
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
};

module.exports = {
  handleGetProfile: handleGetProfile
};
