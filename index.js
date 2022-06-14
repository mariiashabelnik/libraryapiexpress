const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretPassword = "bghnkiy76aks";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

//tillgång till bd
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

//hämta alla böcker
app.get("/books", (req, res) => {
  sqlConnection.query("SELECT * FROM books order by added", (err, response) => {
    if (err) {
      throw err;
    }
    res.json(response);
  });
});

//hämta en bok
app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  sqlConnection.query("SELECT * FROM books where id=?", id, (err, response) => {
    if (err) {
      throw err;
    }
    if (response.length === 1) {
      res.json(response[0]);
    } else {
      // hitta inget
      res.json(404, { msg: "No such book" });
    }
  });
});

//skapa en bok
app.post("/books", (req, res) => {
  sqlConnection.query(
    "INSERT INTO `library`.`books` (`title`, `category`, `author`, `released`) VALUES (?, ?, ?, ?)",
    [req.body.title, req.body.category, req.body.author, req.body.released],
    (err, response) => {
      if (err) {
        if (err.errno === 1265) {
          return res.json(400, { msg: "Bad category" });
        }
        if (err.errno === 1292) {
          return res.json(400, { msg: "Bad date of release" });
        }
      }
      res.json(response);
    }
  );
});

//ändra en bok (full)
app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  sqlConnection.query(
    "UPDATE `library`.`books` SET title=?, author=?, category=?, released=? where id=? limit 1",
    [req.body.title, req.body.author, req.body.category, req.body.released, id],
    (err, response) => {
      if (err) {
        if (err.errno === 1265) {
          return res.json(400, { msg: "Bad category" });
        }
        if (err.errno === 1292) {
          return res.json(400, { msg: "Bad date of release" });
        }
      }
      res.json(response);
    }
  );
});

//Ändra en bok (partial)
app.patch("/books/:id", (req, res) => {
  const { id } = req.params;

  let query = "UPDATE `library`.`books` SET ";
  const queryParams = [];

  // om title
  if (req.body.title) {
    query += " title=?,";
    queryParams.push(req.body.title);
  }
  // om author
  if (req.body.author) {
    query += " author=?,";
    queryParams.push(req.body.author);
  }
  // om category
  if (req.body.category) {
    query += " category=?,";
    queryParams.push(req.body.category);
  }
  // om released
  if (req.body.released) {
    query += " released=?,";
    queryParams.push(req.body.released);
  }

  query = query.substring(0, query.length - 1);
  query += " WHERE id=?";
  queryParams.push(id);

  console.log(query);
  sqlConnection.query(query, queryParams, (err, response) => {
    if (err) {
      if (err.errno === 1265) {
        return res.json(400, { msg: "Bad category" });
      }
      if (err.errno === 1292) {
        return res.json(400, { msg: "Bad date of release" });
      }
    }
    res.json(response);
  });
});

//ta bort en bok
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  sqlConnection.query("DELETE FROM books where id=?", id, (err, response) => {
    if (err) {
      throw err;
    }
    res.json(response);
  });
});

//skapa användare
app.post("/auth/register", async (req, res) => {
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
app.post("/auth/login", (req, res) => {
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
      const token = jwt.sign(response[0], secretPassword);

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

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
