const router = require("express").Router();
const {
  getExpense,
  postDpExpense,
  deleteExpense,
  updateExpense,
} = require("../handler/expenseHndle");

router.post("/addExpense", postDpExpense);

router.get("/getExpense/:name", getExpense);

router.put("/updateExpense/:id", updateExpense);

router.delete("/deleteExpense/:id", deleteExpense);

module.exports = router;
