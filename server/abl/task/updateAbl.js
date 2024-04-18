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
    taskId: { type: "string" },
    childId: { type: "string" },
    taskName: { type: "string" },
    grade: { type: "number", minimum: 1, maximum:3 },
    rewardedAmount: { type: "number", minimum: 0},
    dateUntil: { type: "string", format: "date" },
    dateFinished: { type: "string", format: "date" },
  },
  required: ["taskId", "dateFinished"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let task = req.body;

    // validate input
    const valid = ajv.validate(schema, task);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const taskList = taskDao.list();


task.updated = new Date();

    const updatedTask = taskDao.update(task);

    if (!updatedTask) {
      res.status(404).json({
        code: "taskNotFound",
        message: `Task ${task.taskId} not found`,
      });
      return;
    }
    const deadline = updatedTask.dateUntil
      
    let dateFinished = moment(task.dateFinished, 'YYYY-MM', true);
    if (dateFinished.isAfter(deadline, 'month')) {
      res.status(400).json({ message: "Date finished is after date until" });
      return;
    }

    res.json(updatedTask);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;