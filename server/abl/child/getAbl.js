const Ajv = require("ajv");
const ajv = new Ajv();
const childDao = require("../../dao/child-dao.js");

const schema = {
  type: "object",
  properties: {
    childId: { type: "string" },
  },
  required: ["childId"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.childId ? req.query : req.body;

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

    // read child by given id
    const child = childDao.get(reqParams.childId);
    if (!child) {
      res.status(404).json({
        code: "childNotFound",
        message: `Child ${reqParams.childId} not found`,
      });
      return;
    }

    res.json(child);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;