const dp = require("../database/dp");

const filterExpense = async (req, res) => {
  try {
    const { option, user_id, value } = req.headers;
    const filterData = await dp.manyOrNone(
      `SELECT * FROM expense_table WHERE $1:name=$3 AND user_id=$2`,
      [option, user_id, value]
    );
    return res.status(201).json({ datas: filterData, status: true });
  } catch (error) {
    return res.status(500).json({ status: false });
  }
};

const searchData = async (req, res) => {
  try {
    const { data, user_id } = req.query;
    const getData = await dp.manyOrNone(
      `SELECT * FROM expense_table WHERE user_id=$1`,
      [user_id]
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
