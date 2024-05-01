const monthlyDao = require("../../dao/monthly-dao.js");

async function ListAbl(req, res) {
  try {
    const monthlyList = monthlyDao.list();
    res.json(monthlyList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;