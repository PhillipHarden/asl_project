const express = require("express");
const app = express();
const quizzesCtrl = require("./src/controllers/quizzes");
const questionsCtrl = require("./src/controllers/questions");
const choicesCtrl = require("./src/controllers/choices");

// GET / HTTP/1.1
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/quizzes", quizzesCtrl);
app.use("/questions", questionsCtrl);
app.use("/choices", choicesCtrl);

app.listen(3000); // http://localhost:3000/ in the web browser

// COLORFUL COMMENTS
//! Red (!)
//? Blue (?)
//* Green (*)
//^ Yellow (^)
//& Pink (&)
//~ Purple (~)
//todo Mustard (todo)
// Grey (//)