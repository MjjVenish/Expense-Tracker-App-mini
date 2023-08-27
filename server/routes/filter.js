const router = require("express").Router();
const { filterExpense, searchData } = require("../handler/filterHandle");

router.get("/filterExpense", filterExpense);

router.get("/searchData", searchData);

module.exports = router;
