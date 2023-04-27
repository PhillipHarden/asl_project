const express = require("express");
const router = express.Router();
const { Quiz } = require("../models");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

//* View the quizzes
//^ curl -X GET http://localhost:3000/quizzes
router.get("/", async (req, res) => {
  const quizzes = await Quiz.findAll(); // Loads all Quizzes
  res.json(quizzes);
});

//* Create a new quiz
//^ curl -X POST --data "name=Quiz One&weight=10" http://localhost:3000/quizzes
router.post("/", async (req, res) => {
  const { name, weight } = req.body;
  const quiz = await Quiz.create({ name, weight });
  res.json(quiz);
});

//* View a single Quiz by id
//^ curl -X GET http://localhost:3000/quizzes/1
router.get("/:id", async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id);
  res.json(quiz);
});

//* Update/Edit a quiz by id
//^ curl -X POST --data "weight=30" http://localhost:3000/quizzes/8
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
//^ curl -X DELETE http://localhost:3000/quizzes/8
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Quiz.destroy({
    where: { id },
  });
  res.json({ deleted });
});

module.exports = router;


//^ Adding quizzes
//! curl -X POST --data "name=Quiz One&weight=35" http://localhost:3000/quizzes

//! curl -X POST --data "name=Quiz Two&weight=25" http://localhost:3000/quizzes
//! curl -X POST --data "name=Quiz Four&weight=50" http://localhost:3000/quizzes