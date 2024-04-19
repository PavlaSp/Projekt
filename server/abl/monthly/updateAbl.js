const moment = require('moment');
const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = (dateStr) => {
  return moment(dateStr, 'YYYY-MM', true).isValid();
};
ajv.addFormat("date", { validate: validateDateTime });

const taskDao = require("../../dao/task-dao.js");
const childDao = require("../../dao/child-dao.js");
const monthlyDao = require("../../dao/monthly-dao.js");

const schema = {
  type: "object",
  properties: {
    childId: { type: "string" },
    dateFinished: { type: "string", format: "date" },
  },
  required: ["childId", "dateFinished"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    const { childId, dateFinished } = req.body;
    if (!childId || !dateFinished) throw new Error("Missing childId or dateFinished in request body.");

    // Get child details
    let childDetails = await childDao.get(childId);
    if (!childDetails || !childDetails.pocketAmount) throw new Error("Child not found or missing pocketAmount.");

    const yearMonth = moment(dateFinished, "YYYY-MM-DD").format("YYYY-MM"); // Format dateFinished to "YYYY-MM"
    
    // Get all tasks for given childId and yearMonth
    const tasks = await taskDao.find(childId, yearMonth);
    
    const totalTaskValue = tasks.reduce((total, task) => total + task.rewardedAmount, 0);
    
    let monthly = await monthlyDao.get(childId, yearMonth); 

    // If monthly data doesn't exist, initialize new data.
    if (!monthly) {
      monthly = {};
      monthly.childId = childId;
      monthly.yearMonth = yearMonth;
      monthly.pocketAmount = childDetails.pocketAmount;  
    } 

    // Update total amount 
    monthly.totalAmount = monthly.pocketAmount + totalTaskValue;

    //Add totalTaskValue
    monthly.totalTaskValue = totalTaskValue;
    
    const updatedMonthly = await monthlyDao.update(monthly);
    
    res.json(updatedMonthly);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
