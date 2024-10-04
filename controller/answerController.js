const db = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// =====================================get answer for a question=========================================
const getAnswer = async (req, res) => {
  const { questionid } = req.params;
  const username = req.user.username;
  try {
    const [answers] = await db.query(
      "SELECT answerid  AS answer_id,answer AS content,created_at,? as user_name FROM answers where questionid= ?",
      [username, questionid]
    );

    if (answers.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "The requested question could not be found.",
      });
    } else {
      return res.status(StatusCodes.OK).json({
        answers: answers,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An unexpected error occurred",
    });
  }
};
module.exports = getAnswer;
