/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // 2 - check if token is valid

  // console.log("HEADERS", req.headers);
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "token not valid" });
      } else {
        // instead of modifying request obj on auth, modify on verify of auth
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No authorization token provided " });
  }
};
