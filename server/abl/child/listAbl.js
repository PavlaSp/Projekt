const childDao = require("../../dao/child-dao.js");

async function ListAbl(req, res) {
  try {
    const childList = childDao.list();
    res.json(childList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
