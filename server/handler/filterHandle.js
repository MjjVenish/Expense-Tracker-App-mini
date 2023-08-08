const dp = require("../database/dp");

const filterExpense = async (req, res) => {
  try {
    const { option, user_name, value } = req.headers;
    const filterData = await dp.manyOrNone(
      `SELECT TO_CHAR(time, 'HH24:MI:SS') AS time_only,date,money,expense,type FROM expense_table WHERE $1:name=$3 AND user_name=$2`,
      [option, user_name, value]
    );

    return res.status(201).json({ datas: filterData, status: true });
  } catch (error) {
    return res.status(500).json({ status: false });
  }
};

const searchData = async (req, res) => {
  try {
    const { data, user_name } = req.query;
    const getData = await dp.manyOrNone(
      `SELECT TO_CHAR(time, 'HH24:MI:SS') AS time_only,expense,date,id,type,money,user_name,trancation FROM expense_table WHERE user_name=$1`,
      [user_name]
    );
    const dataSearch = getData.filter((sea) =>
      sea.expense.toLowerCase().includes(data.toLowerCase())
    );
    return res.status(201).json({ items: dataSearch });
  } catch (error) {
    return res.status(500).json({ status: false });
  }
};

module.exports = { filterExpense, searchData };
