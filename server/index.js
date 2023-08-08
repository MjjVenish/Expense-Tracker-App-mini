const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userLogin = require("./routes/login");
const userRegister = require("./routes/register");
const tables = require("./routes/database");
const updateUser = require("./routes/update");
const expenses = require("./routes/expense");
const filterRouter = require("./routes/filter");
const uploadRouter = require("./routes/upload");

PORT = process.env.PORT || 3007;

app.use(cookieParser());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/", express.static("public"));

app.use(tables);
app.use(userRegister);
app.use(userLogin);
app.use(updateUser);
app.use(expenses);
app.use(filterRouter);
app.use(uploadRouter);

app.listen(PORT, () => {
  console.log(`Server was Running${PORT} ....`);
});
