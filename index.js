const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.use("/books", require("./controller/books"));
app.use("/auth", require("./controller/users"));

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
