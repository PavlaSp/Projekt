const fs = require('fs');
const path = require('path');
const monthlyFolderPath = path.join(__dirname, 'storage', 'monthlyList');

function getFileName(childId, yearMonth) {
  return `${childId}-${yearMonth}.json`;
}

function get( childId, yearMonth) {
  try {
    const fileName = getFileName(childId, yearMonth);
    const filePath = path.join(monthlyFolderPath, fileName);
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileData);
    }
    return null;
  } catch (error) {
    throw { code: 'failedToGetMonthlyAmount', message: error.message };
  }
}
// Method to list monthly in a folder
function list() {
  try {
    const files = fs.readdirSync(monthlyFolderPath);
    const monthlyList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(monthlyFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return monthlyList;
  } catch (error) {
    throw { code: "failedToListMonthly", message: error.message };
  }
}

function update({ childId, yearMonth, pocketAmount, totalAmount, totalTaskValue }) {
  try {
    const monthly = { childId, yearMonth, pocketAmount, totalAmount, totalTaskValue };
    const fileName = getFileName(childId, yearMonth);
    const filePath = path.join(monthlyFolderPath, fileName);
    const fileData = JSON.stringify(monthly);
    fs.writeFileSync(filePath, fileData, 'utf8');
    return monthly;
  } catch (error) {
    throw { code: 'failedToUpdateMonthlyAmount', message: error.message };
  }
}

module.exports = {
   get,
   update,
   list
};