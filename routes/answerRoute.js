const express = require("express");
const router = express.Router();

const { postAnswers, getAnswer } = require("../controller/answerController");
const { getAnswer, postAnswers } = require("../controller/answerController");
router.get("/:questionid", getAnswer);
router.post("/postAnswers", postAnswers);

module.exports = router;
