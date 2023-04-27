const express = require("express");
const app = express();
const { Quiz } = require("./src/models");
const quizzesCtrl = require("./src/controllers/quizzes");
const questionsCtrl = require("./src/controllers/questions");
const choicesCtrl = require("./src/controllers/choices");
const authCtrl = require("./src/controllers/auth");
const bodyParser = require("body-parser");
const session = require("express-session");

app.use(
  session({
    saveUnitialized: false,
    secret: "keyword cat", //something random
    cookie: { maxAge: 60000 },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", __dirname + "/src/views");
app.set("view engine", "twig");

// GET / HTTP/1.1
app.get("/", async (req, res, next ) => {
  // console.log("Access token: " + req.session.access_token);
  res.render("home/home");
});

app.use("/quizzes", quizzesCtrl);
app.use("/questions", questionsCtrl);
app.use("/choices", choicesCtrl);
app.use("/auth", authCtrl);

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