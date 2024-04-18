const moment = require('moment');
const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = (dateStr) => {
  return moment(dateStr, 'YYYY-MM', true).isValid();
};
ajv.addFormat("date", { validate: validateDateTime });

const childDao = require("../../dao/child-dao.js");

const schema = {
  type: "object",
  properties: {
    childId: { type: "string" },
    childName: { type: "string" },
    pocketAmount: { type: "number" },
    dateFrom: { type: "string", format: "date" },
    },
  required: ["childId", "pocketAmount","dateFrom"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let child = req.body;

    // validate input
    const valid = ajv.validate(schema, child);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
      //dateFrom is not past date validation
      let dateFrom = moment(child.dateFrom, 'YYYY-MM', true);
      if (dateFrom.isBefore(moment(), 'month')) {
        res.status(400).json({ message: "Date is from the past" });
        return;
      }

    const childList = childDao.list();
   
    child.updated = new Date();
    const updatedChild = childDao.update(child);

    if (!updatedChild) {
      res.status(404).json({
        code: "childNotFound",
        message: `Child ${child.childId} not found`,
      });
      return;
    }

    res.json(updatedChild);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;