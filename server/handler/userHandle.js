const dp = require("../database/dp");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const userRegister = async (req, res) => {
  try {
    const { user_name, password, first_name, last_name, email } = req.body;
    const checkUser = await dp.manyOrNone(
      `SELECT user_name FROM users_table WHERE user_name=$1`,
      [user_name]
    );
    const checkEmail = await dp.manyOrNone(
      "SELECT email FROM users_table WHERE email=$1",
      [email]
    );
    if (checkUser[0]) {
      return res.json({ message: "User Already Exits", status: false });
    } else if (checkEmail[0]) {
      return res.json({ message: "Email Already Exits", status: false });
    } else {
      const hashedPassword = await hashPassword(password);
      await dp.manyOrNone(
        `INSERT INTO users_table(first_name,last_name,user_name,email,password) VALUES($1,$2,$3,$4,$5)`,
        [first_name, last_name, user_name, email, hashedPassword]
      );
      const userToken = jwt.sign({ user: email }, process.env.JWT_TOKEN);
      res.cookie("token", userToken);
      return res.status(200).json({
        message: "User Register SucessFully",
        status: true,
        token: userToken,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, user_name, password } = req.body;
    const checkUser = await dp.manyOrNone(
      `SELECT * FROM users_table WHERE user_name=$1`,
      [user_name]
    );
    if (!checkUser[0]) {
      return res.status(401).json({ message: "User does not Exits" });
    }
    const passwordMatch = await bcrypt.compare(password, checkUser[0].password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid User Password or UserName " });
    } else {
      const user = { user: email };
      const userToken = jwt.sign(user, process.env.JWT_TOKEN);
      console.log(userToken);
      res.cookie("token", userToken);
      return res
        .status(200)
        .json({ message: "User Login SucessFully", token: userToken });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    console.log(req.user);
    const { user } = req.user;
    const getData = await dp.manyOrNone(
      `SELECT user_name,id FROM users_table WHERE email=$1`,
      [user]
    );
    const loginUser = getData[0];
    return res
      .status(200)
      .json({ loginName: loginUser?.user_name, id: loginUser?.id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUser, userLogin, userRegister };
