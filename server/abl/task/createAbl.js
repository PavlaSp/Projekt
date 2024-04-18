const moment = require('moment');
const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = (dateStr) => {
  return moment(dateStr, 'YYYY-MM', true).isValid();
};
ajv.addFormat("date", { validate: validateDateTime });

const taskDao = require("../../dao/task-dao.js");
const validTaskNames = taskDao.getSubjects();


const schema = {
  type: "object",
  properties: {
    childId: { type: "string" },
    taskName: { type: "string", 
    enum: validTaskNames },
    grade: { type: "number", minimum: 1, maximum:3 },
    rewardedAmount: { type: "number", minimum: 0 },
    dateUntil: { type: "string", format: "date" },
    dateFinished: { type: "string", format: "date" },

    },
  required: ["childId", "taskName", "grade", "rewardedAmount", "dateUntil"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let task = req.body;

    // validate input
    const valid = ajv.validate(schema, task);
    if (!valid) {const taskNameError = ajv.errors.find(error => error.dataPath === ".taskName");
    if (taskNameError) {
        res.status(400).json({
            code: "invalidTaskName",
            message: "Task name is not allowed.",
        });
        return;
      }

        res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
   //dateUntil is not past date validation
   let dateUntil = moment(task.dateUntil, 'YYYY-MM', true);
   if (dateUntil.isBefore(moment(), 'month')) {
     res.status(400).json({ message: "Date is from the past" });
     return;
   }
    const taskList = taskDao.list();

    const taskExists = taskList.some(
  (existingTask) =>
    existingTask.childId === task.childId &&
    existingTask.taskName === task.taskName &&
    existingTask.grade === task.grade &&
    existingTask.rewardedAmount === task.rewardedAmount && 
    existingTask.dateUntil === task.dateUntil
);
    if (taskExists) {
      res.status(400).json({
        code: "taskAlreadyExists",
        message: `This task already exists`,
      });
      return;
    }
    task.created = new Date();
    task = taskDao.create(task);
    res.json(task);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;