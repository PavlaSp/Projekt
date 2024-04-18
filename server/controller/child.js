const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/child/getAbl");
const ListAbl = require("../abl/child/listAbl");
const CreateAbl = require("../abl/child/createAbl");
const UpdateAbl = require("../abl/child/updateAbl");

router.get("/get", (req, res) => {
  GetAbl(req, res);
});

router.get("/list", (req, res) => {
  ListAbl(req, res);
});

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.post("/update", (req, res) => {
  UpdateAbl(req, res);
});

module.exports = router;