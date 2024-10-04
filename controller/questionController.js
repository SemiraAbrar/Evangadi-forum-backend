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
    await dbconnection.query(
      "INSERT INTO questions (userid, questionid, title, description, tag) values ( ?, ?, ?, ?, ?)",
      [userId, generatedquestionid, title, description, tag]
    );
    return res
      .status(201)
      .json({ message: "Question created successfully", data: data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}
module.exports = { allquestions, singlequestion, postquestion };
