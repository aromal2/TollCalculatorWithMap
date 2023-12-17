const express = require("express");
const router = express.Router();
const mainController = require("../controllers/controllers");

router.post("/", mainController.fetchTollData);

module.exports = router;
