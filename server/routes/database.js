const dpRouter = require("express").Router();

const tables = require("../database/createTable");

dpRouter.get("/create_table", (req, res) => {
  tables().then((result) => {
    if (result) {
      return res.status(201).json({ message: result });
    }
  });
});

module.exports = dpRouter;
