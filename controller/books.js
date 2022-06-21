const express = require("express");
const bookModel = require("../model/books");

const router = express.Router();

//hämta alla böcker
router.get("/", (req, res) => {
  bookModel
    .getAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(400, err);
    });
});

//hämta en bok
router.get("/:id", (req, res) => {
  const { id } = req.params;
  bookModel
    .getOneById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(400, err);
    });
});

//skapa en bok
router.post("/", (req, res) => {
  const { title, category, author, released } = req.body;
  bookModel
    .create(title, category, author, released)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(400, err);
    });
});

//ändra en bok (full)
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, category, author, released } = req.body;
  bookModel
    .update(title, category, author, released, id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(400, err);
    });
});

//Ändra en bok (partial)
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { title, category, author, released } = req.body;
  bookModel
    .updatePartial(title, category, author, released, id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(400, err);
    });
});

//ta bort en bok
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  bookModel
    .remove(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(400, err);
    });
});

module.exports = router;
