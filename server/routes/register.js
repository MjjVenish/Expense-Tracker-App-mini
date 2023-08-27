const router = require("express").Router();
const { userRegister } = require("../handler/userHandle");

router.post("/register", userRegister);

module.exports = router;
