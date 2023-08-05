const router = require("express").Router();
const { updateNameAndEmail, updatePassword } = require("../handler/userUpdate");

router.put("/updateUser/:id", updateNameAndEmail);

router.put("/updatePassword/:id", updatePassword);

module.exports = router;
