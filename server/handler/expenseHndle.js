const dp = require("../database/dp");

const postDpExpense = async (req, res) => {
  try {
    console.log(req.body);
    const { id, date, expense, money, trancation, user_id, type, addTime } =
      req.body;
    const data = await dp.manyOrNone(
      `INSERT INTO expense_table(id,user_id,expense,money,trancation,date,type,addTime) 
     VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,
      [id, user_id, expense, money, trancation, date, type, addTime]
    );
    console.log(data);
    return res.status(200).json({ status: true });
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

module.exports = { postDpExpense, deleteExpense, updateExpense };
