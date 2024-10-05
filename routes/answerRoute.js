const express = require("express");
const router = express.Router();

const getAnswer = require("../controller/answerController");
router.get("/:questionid", getAnswer);

const { postAnswers } = require("../controller/answersController");

router.post("/postAnswers", postAnswers);

module.exports = router;
