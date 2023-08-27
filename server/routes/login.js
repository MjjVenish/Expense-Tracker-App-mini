const router = require("express").Router();
require("dotenv").config();
const { userLogin, getUser } = require("../handler/userHandle");
const authencateToken = require("../handler/authToken");

router.post("/login", userLogin);

router.get("/getUser", authencateToken, getUser);

module.exports = router;
