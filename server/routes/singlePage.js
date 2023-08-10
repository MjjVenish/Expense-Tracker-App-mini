const router = require("express").Router();
const getSingle = require("../handler/singleTranc");

router.get("/singleTranscation/:id", getSingle);

module.exports = router;
