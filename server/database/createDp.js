const { dp, database } = require("./dp");

const createDataBase = async () => {
  try {
    const allDatabase = await dp.manyOrNone(`SELECT datname FROM pg_dagtabase`);
    const checkDatabase = allDatabase.filter(
      (dataBase) => dataBase.datname === database
    );
    if (!checkDatabase[0]) {
      await dp.manyOrNone(`CREATE DATABASE $1:name`, [database]);
      return "database create sucessfully";
    } else {
      return "database already exits";
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = createDataBase;
