const express = require("express");

const router = express.Router();
//question controllers
const {
  //  allquestions,
  //  singlequestion,
  postquestion,
} = require("../controller/questionController");

router.get("/all-questions", getAllQuestions);

//post question route
router.post("/question", postquestion);
module.exports = router;
