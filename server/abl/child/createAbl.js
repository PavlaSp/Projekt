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
    childName: { type: "string" },
    pocketAmount: { type: "number", minimum: 0 },
    dateFrom: { type: "string", format: "date" },
    },
  required: ["childName","pocketAmount", "dateFrom"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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
    //child name exist validation
    const childList = childDao.list();
    const childNameExists = childList.some((existingChild) => existingChild.childName === child.childName);
    if (childNameExists) {
      res.status(400).json({
        code: "nameAlreadyExists",
        message: `Child with this name ${child.childName} already exists`,
      });
      return;
    }
    child.dateFrom= moment().format("YYYY-MM");
    child = childDao.create(child);
    res.json(child);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;