// import modules
const dbconnection = require("../db/dbConfig"); //db_config

//const { statusCodes } = require("http-status-codes");
//const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

//all question controller
async function allquestions(req, res) {
  res.send("all question");
}

//singlequestion controller
async function singlequestion(req, res) {
  res.send("single question");
}

//postquestion controller
async function postquestion(req, res) {
  const { title, description, tag } = req.body;
  const generatedquestionid = uuidv4(); //to generate question id
  const userId = req.user.userid; //aess  userid from usertable by req.user from jwt token

  if (!title || !description || title.length <= 1 || description.length <= 10) {
    return res.status(400).json({
      error: "Bad Request",
      message: "please provide all required information",
    });
  }
  try {
      const [question]=  await dbconnection.query(
      "INSERT INTO questions (userid, questionid, title, description, tag) values ( ?, ?, ?, ?, ?)",
      [userId, generatedquestionid, title, description, tag]
    );
    return res
      .status(201)
      .json({ message: "Question created successfully", data: question });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

// all question controller
async function getAllQuestions(req, res) {

  try {
    const [allQuestions] = await dbConnection.query(
      `SELECT q.questionid As question_id, q.title, q.description As content, q.created_at, u.username FROM questions AS q 
    JOIN users AS u ON q.userid = u.userid ORDER BY q.id DESC;`
    );

    // Check if any questions were found
    if (allQuestions.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No questions found." });
    }

    console.log(allQuestions);
    return res.status(StatusCodes.OK).json({ questions: allQuestions });
  } catch (error) {

    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred" });
  }
}

module.exports = { getAllQuestions, postquestion };
