const express = require("express");
const router = express.Router();
const { Quiz } = require("../models");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

//* View the quizzes
//^ curl -H "accept: application/json" http://localhost:3000/quizzes
router.get("/", async (req, res) => {
  const quizzes = await Quiz.findAll(); // Loads all Quizzes
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(quizzes);
  } else {
    res.render("quiz/index", { quizzes });
  }
});

//* Form
router.get("/new", (req, res) => {
  res.render("quiz/create");
});

//* Create a new quiz
//^ curl -H "accept: application/json" -X POST --data "name=New Quiz&weight=25" http://localhost:3000/quizzes
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
//^ curl -H "accept: application/json" -X GET http://localhost:3000/quizzes/1
router.get("/:id", async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id);
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(quiz);
  } else {
    res.render("quiz/show", { quiz });
  }
});

//* Form
router.get("/:id/edit", async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id);
  res.render("quiz/edit", { quiz });
});

//* Update/Edit a quiz by id
//^ curl -H "accept: application/json" -X POST --data "name=Renamed&weight=75" http://localhost:3000/quizzes/27
router.post("/:id", async (req, res) => {
  const { name, weight } = req.body;
  const { id } = req.params;
  const quiz = await Quiz.update(
    { name, weight },
    {
      where: { id },
    }
  );
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(quiz);
  } else {
    res.redirect("/quizzes/" + id);
  }
});

//* Delete a quiz by id
//^ curl -H "accept: application/json" -X GET http://localhost:3000/quizzes/27/delete
router.get("/:id/delete", async (req, res) => {
  const { id } = req.params;
  const deleted = await Quiz.destroy({
    where: { id },
  });
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json({'success': true});
  } else {
    res.redirect("/quizzes");
  }
});

module.exports = router;


//^ Adding quizzes
//! curl -X POST --data "name=Quiz One&weight=35" http://localhost:3000/quizzes

//! curl -X POST --data "name=Quiz Two&weight=25" http://localhost:3000/quizzes
//! curl -X POST --data "name=Quiz Four&weight=50" http://localhost:3000/quizzes