// db connection
const dbConnection = require("../db/dbConfig");

const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const express = require("express");
//questionid generator
const { v4: uuidv4 } = require("uuid");
// const router = express.Router();

async function postquestion(req, res) {
  const { title, description, tag } = req.body;
  const {userid} = req.user.userid;
  //validation
  if (!title || !description) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }

  const genid = uuidv4();
  try {
    const question = await dbConnection.query(
      "INSERT INTO questions(questionid,userid,title,description,tag) VALUES(?,?,?,?,?)",
      [genid, userid, title, description, tag]);
    await question.save();
    res.status(StatusCodes.OK).json({
      message: "Question created successfully",
      data: question,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}
module.exports = postquestion;
