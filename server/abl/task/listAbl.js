const moment = require('moment');
const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = (dateStr) => {
  return moment(dateStr, 'YYYY-MM', true).isValid();
};
ajv.addFormat("date", { validate: validateDateTime });
const taskDao = require("../../dao/task-dao.js");

const schema = {
  type: "object",
  properties: {
  dateUntil: { type: "string", format: "date" },
  },
  required: ["dateUntil"],
  additionalProperties: false,
};
async function ListAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.dateUntil ? req.query : req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
       // read tasks by given date
       const task = taskDao.list(reqParams.dateUntil);
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

module.exports = ListAbl;
