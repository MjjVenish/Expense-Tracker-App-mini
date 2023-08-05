const dp = require("../database/dp");

const postDpExpense = async (req, res) => {
  try {
    console.log(req.body);
    const { id, date, expense, money, trancation, user_name, type } = req.body;
    const data = await dp.manyOrNone(
      `INSERT INTO expense_table(id,expense,money,trancation,date,type,user_name) 
     VALUES($1,$2,$3,$4,$5,$6,$7)`,
      [id, expense, money, trancation, date, type, user_name]
    );
    console.log(data);
    return res.status(200).json({ status: true });
  } catch (error) {
    return res.status(500).json({ status: false });
  }
};

const getExpense = async (req, res) => {
  try {
    const { name } = req.params;
    const getData = await dp.manyOrNone(
      `SELECT TO_CHAR(time, 'HH24:MI:SS') 
      AS time_only,expense,date,id,type,money,user_name,trancation 
      FROM expense_table WHERE user_name=$1 ORDER BY time DESC`,
      [name]
    );
    return res.status(200).json({ expenseData: getData });
  } catch (error) {
    return res.status(500).json({ status: false });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, expense, money, trancation, type } = req.body;
    await dp.manyOrNone(
      `UPDATE expense_table SET expense=$1,money=$2,trancation=$3,type=$4,date=$5 WHERE id=$6`,
      [expense, money, trancation, type, date, id]
    );
    return res.status(201).json({ status: true });
  } catch (error) {
    return res.status(500).json({ status: false });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await dp.none(`DELETE FROM expense_table WHERE id=$1`, [id]);
    return res.status(201).json({ status: true });
  } catch (error) {
    return res.status(500).json({ status: false });
  }
};

module.exports = { getExpense, postDpExpense, deleteExpense, updateExpense };
