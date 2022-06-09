const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

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

app.get("/books", (req, res) => {
  sqlConnection.query("SELECT * FROM books order by added", (err, response) => {
    if (err) {
      throw err;
    }
    res.json(response);
  });
});

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

app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  sqlConnection.query("DELETE FROM books where id=?", id, (err, response) => {
    if (err) {
      throw err;
    }
    res.json(response);
  });
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
