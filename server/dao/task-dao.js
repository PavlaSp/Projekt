const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const moment = require('moment');

const taskFolderPath = path.join(__dirname, "storage", "taskList");
const subjectsFilePath = path.join(__dirname, "storage", "subjects.json");  // path to the subjects file

// Method to read an task from a file
function get(taskId) {
  try {
    const filePath = path.join(taskFolderPath, `${taskId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadTask", message: error.message };
  }
}
// Method to read list of subjects
function getSubjects() {
  try {
    const fileData = fs.readFileSync(subjectsFilePath, "utf8");  
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw { code: "failedToReadSubjects", message: error.message };
  }
}
// Method to read list of tasks
function getAllTasks() {
  const fileNames = fs.readdirSync(taskFolderPath);
  const tasks = fileNames.map((fileName) => {
    const filePath = path.join(taskFolderPath, fileName);
    const taskData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return taskData;
  });
  return tasks.flat();
}

function findDetailed(childId, dateFinished) {
  const allTasks = getAllTasks();
  const tasks = allTasks.filter(
    task =>
      task.childId === childId &&
      moment(task.dateFinished, "YYYY-MM-DD").format("YYYY-MM") === dateFinished
  );
  return tasks.map(task => ({
    childId: task.childId,
    year: moment(task.dateFinished).format('YYYY'),
    month: moment(task.dateFinished).format('MM'),
    dateFinished: task.dateFinished,
    rewardedAmount: task.rewardedAmount
  }));
}
// Method to write a monthly total amount to a file
function find(childId, dateFinished) {
  const allTasks = getAllTasks();
  const tasks = allTasks.filter(
    task =>
      task.childId === childId &&
      moment(task.dateFinished, "YYYY-MM-DD").format("YYYY-MM") === dateFinished
  );
  return tasks;
}

// Method to write an task to a file
function create(task) {
  try {
    task.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(taskFolderPath, `${task.id}.json`);
    const fileData = JSON.stringify(task);
    fs.writeFileSync(filePath, fileData, "utf8");
    return task;
  } catch (error) {
    throw { code: "failedToCreateTask", message: error.message };
  }
}

// Method to update task in a file
function update(task) {
  try {
    const currentTask = get(task.taskId);
    if (!currentTask) return null;
    const newTask = { ...currentTask, ...task };
    const filePath = path.join(taskFolderPath, `${task.taskId}.json`);
    const fileData = JSON.stringify(newTask);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newTask;
  } catch (error) {
    throw { code: "failedToUpdateTask", message: error.message };
  }
}


// Method to list tasks with dateUntil
function list(dateUntil) {
  try {
    let tasks = [];
    let files = fs.readdirSync(taskFolderPath);
    
    files.forEach(file => {
      const fileData = JSON.parse(fs.readFileSync(path.join(taskFolderPath, file), "utf8")); 
      if (fileData.dateUntil === dateUntil) {
        tasks.push(fileData);
      }
    });
    return tasks;
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadTask", message: error.message };
  }
}



module.exports = {
  get,
  getSubjects,
  getAllTasks,
  findDetailed,
  create,
  update,
  list,
  find,
  }; 