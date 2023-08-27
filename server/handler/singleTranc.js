const dp = require("../database/dp");

const getSingle = async (req, res) => {
  const { id } = req.params;
  try {
    const getTranc = await dp.manyOrNone(
      "SELECT * FROM expense_table WHERE id=$1",
      [id]
    );
    return res.status(200).json({ datas: getTranc });
  } catch (error) {
    return res.status(500).json({ datas: error.message });
  }
};

module.exports = getSingle;
