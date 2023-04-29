const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
const { isAuthenticated } = require("../middlewares/auth");
const { Quiz, Question, Choice } = require("../models/index");
const { quizzIsValid } = require("../middlewares/forms");

//* View the quizzes
//? http://localhost:3000/quizzes
router.get("/", async (req, res) => {
  const quizzes = await Quiz.findAll({
    include: [{ model: Question, include: [Choice] }],
  });
  res.json(quizzes);
});

//* Form
router.get("/new", (req, res) => {
  res.render("quiz/create");
});

//* Create a new quiz
router.post("/", async (req, res) => {
  const { name, weight } = req.body;
  const quiz = await Quiz.create({ name, weight });
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(quiz);
  } else {
    res.redirect("/quizzes/" + quiz.id);
  }
});

//* View a single Quiz by id
//? http://localhost:3000/quizzes/1
router.get("/:id", async (req, res) => {
  const quiz = await Quiz.findByPk(Number(req.params.id), {
    include: [{ model: Question, include: [Choice] }],
  });
  res.json(quiz);
});

//* Form
router.get("/:id/edit", async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id);
  res.render("quiz/edit", { quiz });
});

//* Update/Edit a quiz by id
router.post("/:id", async (req, res) => {
  const { name, weight } = req.body;
  const { id } = req.params;
  const quiz = await Quiz.update(
    { name, weight },
    {
      where: { id },
    }
  );
  res.json(quiz);
});

//* Delete a quiz by id
router.get("/:id/delete", async (req, res) => {
  const deleted = await Quiz.destroy({
    where: { id: Number(req.params.id) },
  });
  res.redirect("/quizzes");
});

module.exports = router;
