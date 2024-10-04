// import modules
const dbConnection = require("../db/dbConfig"); //db_config

const {  StatusCodes } = require("http-status-codes");
//const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

//postquestion controller
async function postquestion(req, res) {
  const { title, description, tag } = req.body;
  const userId = req.user.userid; //aess  userid from usertable by req.user from jwt token
  
  if (!title || !description || title.length <= 1 || description.length <= 10) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "please provide all required information",
    });
  }
  const generatedquestionid = uuidv4(); //to generate question id
  try {
    const [question] = await dbConnection.query(
      "INSERT INTO questions (userid, questionid, title, description, tag) values ( ?, ?, ?, ?, ?)",
      [userId, generatedquestionid, title, description, tag]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Question created successfully", data: question });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
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


async function SingleQuestion(req, res) {
 
  const question_id = req.params.question_id
try {
const result = await  dbConnection.query("select * from questions where questionid=?",[question_id]) 
const data = result[0][0]
res.send(data)
} catch (error) {
res.send(error.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "An unexpected error occurred"})
}

}


module.exports = { getAllQuestions, postquestion,  SingleQuestion};
