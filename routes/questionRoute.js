const express = require("express");

const router = express.Router();
//question controllers
const {
  getAllQuestions,
  postquestion,
} = require("../controller/questionController");


router.get("/all-questions", getAllQuestions);

//post question route
router.post("/question", postquestion);
module.exports = router;
