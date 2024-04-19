const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/monthly/getAbl");
const UpdateAbl = require("../abl/monthly/updateAbl");

router.get("/get", (req, res) => {
  GetAbl(req, res);
});
router.post("/update", (req, res) => {
  UpdateAbl(req, res);
});


module.exports = router;