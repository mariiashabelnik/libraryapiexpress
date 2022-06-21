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

//hämta alla böcker
const getAll = () => {
  return new Promise((resolve, reject) => {
    sqlConnection.query(
      "SELECT * FROM books order by added",
      (err, response) => {
        if (err) {
          return reject(err);
        }
        resolve(response);
      }
    );
  });
};

//hämta en bok
const getOneById = (id) => {
  return new Promise((resolve, reject) => {
    sqlConnection.query(
      "SELECT * FROM books where id=?",
      id,
      (err, response) => {
        if (err) {
          return reject(err);
        }
        if (response.length === 1) {
          resolve(response[0]);
        } else {
          // hitta inget
          reject({ msg: "No such book" });
        }
      }
    );
  });
};

//skapa en bok
const create = (title, category, author, released) => {
  return new Promise((resolve, reject) => {
    sqlConnection.query(
      "INSERT INTO `library`.`books` (`title`, `category`, `author`, `released`) VALUES (?, ?, ?, ?)",
      [title, category, author, released],
      (err, response) => {
        if (err) {
          if (err.errno === 1265) {
            return reject({ msg: "Bad category" });
          }
          if (err.errno === 1292) {
            return reject({ msg: "Bad date of release" });
          }
        }
        resolve(response);
      }
    );
  });
};

//ändra en bok (full)
const update = (id, title, category, author, released) => {
  return new Promise((resolve, reject) => {
    sqlConnection.query(
      "UPDATE `library`.`books` SET title=?, author=?, category=?, released=? where id=? limit 1",
      [title, category, author, released, id],
      (err, response) => {
        if (err) {
          if (err.errno === 1265) {
            return reject({ msg: "Bad category" });
          }
          if (err.errno === 1292) {
            return reject({ msg: "Bad date of release" });
          }
        }
        resolve(response);
      }
    );
  });
};

//Ändra en bok (partial)
const updatePartial = (id, title, category, author, released) => {
  return new Promise((resolve, reject) => {
    let query = "UPDATE `library`.`books` SET ";
    const queryParams = [];

    // om title
    if (title) {
      query += " title=?,";
      queryParams.push(title);
    }
    // om author
    if (author) {
      query += " author=?,";
      queryParams.push(author);
    }
    // om category
    if (category) {
      query += " category=?,";
      queryParams.push(category);
    }
    // om released
    if (released) {
      query += " released=?,";
      queryParams.push(released);
    }

    query = query.substring(0, query.length - 1);
    query += " WHERE id=?";
    queryParams.push(id);

    console.log(query);
    sqlConnection.query(query, queryParams, (err, response) => {
      if (err) {
        if (err.errno === 1265) {
          return reject({ msg: "Bad category" });
        }
        if (err.errno === 1292) {
          return reject({ msg: "Bad date of release" });
        }
      }
      resolve(response);
    });
  });
};

//ta bort en bok
const remove = (id) => {
  return new Promise((resolve, reject) => {
    sqlConnection.query("DELETE FROM books where id=?", id, (err, response) => {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports = {
  getAll,
  getOneById,
  create,
  update,
  updatePartial,
  remove,
};
