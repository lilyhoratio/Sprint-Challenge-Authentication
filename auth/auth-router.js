const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig.js");
const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    username: user.username
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    // expiresIn: "3000ms"
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}

// ask about /refresh endpoint

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
  let { username, password } = req.body;

  db("users")
    .where({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        // 1 - generate token and giving it back to the client. Next is authenticate-middleware
        res.status(200).json({
          message: `Hello ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "incorrect username or password" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
