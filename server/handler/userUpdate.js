const dp = require("../database/dp");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const updateNameAndEmail = async (req, res) => {
  try {
    const { user_name, email } = req.body;
    const { id } = req.params;
    console.log(req.body, req.params);
    await dp.none(`UPDATE users_table SET user_name=$1,email=$2 WHERE id=$3`, [
      user_name,
      email,
      id,
    ]);
    const userToken = jwt.sign({ user: email }, process.env.JWT_TOKEN);
    return res
      .status(201)
      .json({ message: "User Update Sucessfully", token: userToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const hashPassword = async (password) => {
  const saltRound = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, saltRound);
};

const updatePassword = async (req, res) => {
  try {
    const { password, user_name } = req.body;
    const getUser = await dp.manyOrNone(
      `SELECT email FROM users_table WHERE user_name=$1`,
      [user_name]
    );
    if (getUser[0]) {
      const hashedPassword = await hashPassword(password);
      await dp.none(`UPDATE users_table SET password=$1 WHERE user_name=$2`, [
        hashedPassword,
        user_name,
      ]);
      return res.status(201).json({ message: "Password Update SucessFully" });
    } else {
      return res.status(401).json({ message: "User does not Exits" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { updateNameAndEmail, updatePassword };
