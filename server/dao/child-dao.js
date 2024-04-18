const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const childFolderPath = path.join(__dirname, "storage", "childList");

// Method to read an child from a file
function get(childId) {
  try {
    const filePath = path.join(childFolderPath, `${childId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") 
       throw { code: "failedToReadChild", message: error.message };
  }
}

// Method to write an child to a file
function create(child) {
  try {
    child.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(childFolderPath, `${child.id}.json`);
    const fileData = JSON.stringify(child);
    fs.writeFileSync(filePath, fileData, "utf8");
    return child;
  } catch (error) {
    throw { code: "failedToCreateChild", message: error.message };
  }
}

// Method to update child in a file
function update(child) {
  try {
    const currentChild = get(child.childId);
    if (!currentChild) return null;
    const newChild = { ...currentChild, ...child };
    const filePath = path.join(childFolderPath, `${child.childId}.json`);
    const fileData = JSON.stringify(newChild);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newChild;
  } catch (error) {
    throw { code: "failedToUpdateChild", message: error.message };
  }
}


// Method to list child in a folder
function list() {
  try {
    const files = fs.readdirSync(childFolderPath);
    const childList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(childFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return childList;
  } catch (error) {
    throw { code: "failedToListChild", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  list,
};