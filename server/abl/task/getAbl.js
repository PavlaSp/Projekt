const Ajv = require("ajv");
const ajv = new Ajv();
const taskDao = require("../../dao/task-dao.js");

const schema = { 
  type: "object", 
  properties:{ 
    taskId: { type: "string" },
   }, 
required: ["taskId"], 
additionalProperties: false, };


async function GetAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.taskId ? req.query : req.body;

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

    
    // read task by given id
    const task = taskDao.get(reqParams.taskId);
    if (!task) {
      res.status(404).json({
        code: "taskNotFound",
        message: `Task ${reqParams.taskId} not found`,
      });
      return;
    }

    res.json(task);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;