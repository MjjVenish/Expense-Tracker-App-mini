const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userLogin = require("./routes/login");
const userRegister = require("./routes/register");
const tables = require("./routes/database");
const updateUser = require("./routes/update");
const expenses = require("./routes/expense");
const filterRouter = require("./routes/filter");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(tables);
app.use(userRegister);
app.use(userLogin);
app.use(updateUser);
app.use(expenses);
app.use(filterRouter);

app.listen(3007, () => {
  console.log("Server was Running 3007....");
});
