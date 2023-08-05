const dp = require("./dp");

const usersTable = `CREATE TABLE "users_table"(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    create_on TIMESTAMP NOT NULL DEFAULT NOW()
);`;

const expenseTable = `CREATE TABLE "expense_table"(
    id VARCHAR(400) NOT NULL UNIQUE,
    expense VARCHAR(200) NOT NULL,
    money VARCHAR(50) NOT NULL,
    trancation VARCHAR(100) NOT NULL,
    date VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    time TIMESTAMP NOT NULL DEFAULT NOW());`;

const createTable = async () => {
  try {
    const allTables = await dp.manyOrNone(
      "SELECT table_name FROM information_schema.tables"
    );

    //create on users table

    const createUsersTable = async () => {
      try {
        const checkUserTable = allTables.filter(
          (table) => table.table_name === "users_table"
        );
        if (!checkUserTable[0]) {
          await dp.none(usersTable);
          return "Users Table created Successfully";
        } else {
          return "Users table already exist";
        }
      } catch (error) {
        return error.message;
      }
    };

    // create on expense table

    const createExpenseTable = async () => {
      try {
        const checkExpense = allTables.filter(
          (table) => table.table_name === "expense_table"
        );
        if (!checkExpense[0]) {
          await dp.none(expenseTable);
          return "expense Table created Successfully";
        } else {
          return "expense already exist";
        }
      } catch (error) {
        return error.message;
      }
    };

    const order = await Promise.all([createUsersTable(), createExpenseTable()]);

    return order;
  } catch (error) {
    return error.message;
  }
};

module.exports = createTable;
