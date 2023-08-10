const router = require("express").Router();
const {
  postDpExpense,
  deleteExpense,
  updateExpense,
} = require("../handler/expenseHndle");

router.post("/addExpense", postDpExpense);

router.put("/updateExpense/:id", updateExpense);

router.delete("/deleteExpense/:id", deleteExpense);

module.exports = router;
