require("dotenv").config();
const express = require("express");

const app = express();
const port = 3000;

// console.log("DB_USERNAME:", process.env.DB_USERNAME);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_NAME:", process.env.DB_NAME);
const cors = require("cors");
app.use(cors());
// db connection
const dbConnection = require("./db/dbConfig");

//user routes middleware file
const userRoutes = require("./routes/userRoute");
//question routes middleware file
const questionsRoute = require("./routes/questionRoute");
//answer routes middleware file
const answerRoute = require("./routes/answerRoute");

//authentication middleware
const authMiddleware = require("./middleware/authMiddleware");
app.use(express.json());

//user routes mddleware
app.use("/api/user", userRoutes);

//questions routes middleware ??
app.use("/api/questions", authMiddleware, questionsRoute);

// answers routes middleware??
app.use("/api/answer", authMiddleware, answerRoute);

async function start() {
  try {
    const result = await dbConnection.execute("SELECT 'Test'");
    // console.log(result);
    app.listen(port);
    console.log("database connection established");
    console.log(`listening on ${port}`);
  } catch (error) {
    console.log(error.message);
    console.error("Error establishing database connection:", error.message);
  }
}
start();
