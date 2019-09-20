const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig.js");

router.post("/register", (req, res) => {
  // implement registration
  let { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  db("users")
    .insert({ username, password: hash }, "id")
    .then(([id]) => {
      // find user by id, returns user info
      return db("users")
        .where({ id })
        .first();
    })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
