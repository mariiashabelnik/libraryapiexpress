const mysql = require("mysql");

//tillgång till db
const sqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "library",
  password: "zxcv1234",
});

sqlConnection.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Connected!");
});

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretPassword = "bghnkiy76aks";

const router = express.Router();

// Not finished

//skapa användare
router.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  sqlConnection.query(
    "INSERT INTO `library`.`users` (`name`, `username`, `password`) VALUES (?, ?, ?)",
    [req.body.name, req.body.username, hash],
    (err, response) => {
      if (err) {
        return res.json(400, err);
      }
      res.json({ msg: "User created" });
    }
  );
});

//login användare
router.post("/login", (req, res) => {
  sqlConnection.query(
    "SELECT * FROM users where username=? limit 1",
    [req.body.username],
    async (err, response) => {
      if (err) {
        return res.json(400, err);
      }

      if (!response[0]) {
        return res.json({ msg: "no such user" });
      }

      const isCorrect = await bcrypt.compare(
        req.body.password,
        response[0].password
      );

      if (isCorrect === false) {
        return res.json({ msg: "no such user" });
      }

      // send back JWT token med userid
      const token = jwt.sign({ userId: response[0].id }, secretPassword);

      res.json({ token });
    }
  );

  /*
    const hash = await bcrypt.hash(req.body.password, 10);
    sqlConnection.query(
      "INSERT INTO `library`.`users` (`name`, `username`, `password`) VALUES (?, ?, ?)",
      [req.body.name, req.body.username, hash],
      (err, response) => {
        if (err) {
          return res.json(400, err);
        }
        res.json({ msg: "User created" });
      }
    ); 
    */
});
module.exports = router;
