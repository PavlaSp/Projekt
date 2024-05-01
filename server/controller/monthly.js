const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/monthly/getAbl");
const UpdateAbl = require("../abl/monthly/updateAbl");
const ListAbl = require("../abl/monthly/listAbl");

router.get("/get", (req, res) => {
  GetAbl(req, res);
});
router.post("/update", (req, res) => {
  UpdateAbl(req, res);
});
router.get("/list", (req, res) => {
  ListAbl(req, res);
});



module.exports = router;