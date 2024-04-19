const moment = require('moment');
const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = (dateStr) => {
  return moment(dateStr, 'YYYY-MM', true).isValid();
};
ajv.addFormat("date", { validate: validateDateTime });
const childDao = require("../../dao/child-dao.js");
const monthlyDao = require("../../dao/monthly-dao.js");

const schema = {
  type: "object",
  properties: {
  childId: { type: "string" },
  dateFinished: { type: "string", format: "date" },
  },
  required: ["childId","dateFinished"],
  additionalProperties: false,
};
async function GetAbl(req, res) {
    try {
        const { childId, dateFinished } = req.body;
        if (!childId || !dateFinished) throw new Error("Missing childId or date in request body.");

     // Get child details
        let childDetails = await childDao.get(childId);
        if (!childDetails) throw new Error("Child not found.");
    
         
    // validate input
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    // read tasks by given date
       const task = monthlyDao.get(childId, dateFinished);
       if (!task) {
         res.status(404).json({
           code: "taskNotFound",
           message: `No tasks found`,
         });
         return;
       }
   
       res.json(task);

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;