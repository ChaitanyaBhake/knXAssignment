const express = require("express");
const router = express.Router();
const { getStats, showDeviation } = require("../controller/showLatestData");

router.get("/stats", getStats);
router.get("/deviation", showDeviation);

module.exports = router;