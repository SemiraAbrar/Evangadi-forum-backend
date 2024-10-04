const express = require("express");

const router = express.Router();

// Middlewares

const authMiddleware = require("../middleware/authMiddleware");

const postquestion = require("../controller/questionController");

// router.get("/all-questions", getAllQuestions);
router.post("/postquestion" , authMiddleware, postquestion);

module.exports = router;
