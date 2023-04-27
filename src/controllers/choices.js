const express = require("express");
const router = express.Router();
const { Choice } = require("../models");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

//* View the choices
//^ curl -X GET http://localhost:3000/choices
router.get("/", async (req, res) => {
  const choices = await Choice.findAll();
  res.json(choices);
});

//* Create a new choice
//^ curl -X POST --data "choice_text=D" http://localhost:3000/choices
router.post("/", async (req, res) => {
  const { choice_text, questionId } = req.body;
  const choice = await Choice.create({ choice_text, questionId });
  res.json(choice);
});

//* View a single choice by id
//^ curl -X GET http://localhost:3000/choices/1
router.get("/:id", async (req, res) => {
  const choice = await Choice.findByPk(req.params.id);
  res.json(choice);
});

//* Update/Edit a choice by id
//^ curl -X POST --data "choice_text=DD" http://localhost:3000/choices/1
router.post("/:id", async (req, res) => {
  const { choice_text, questionId } = req.body;
  const { id } = req.params;
  const choice = await Choice.update(
    { choice_text, questionId },
    {
      where: { id },
    }
  );
  res.json(choice);
});

//* Delete a choice by id
//^ curl -X DELETE http://localhost:3000/choices/1
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Choice.destroy({
    where: { id },
  });
  res.json({ deleted });
});

module.exports = router;

// curl -X POST --data "questionId=1" http://localhost:3000/choices/1


//^ Adding choices
//! curl -X POST --data "choice_text=A&questionId=1" http://localhost:3000/choices
//! curl -X POST --data "choice_text=B&questionId=1" http://localhost:3000/choices
//! curl -X POST --data "choice_text=C&questionId=1" http://localhost:3000/choices

//! curl -X POST --data "choice_text=A&questionId=2" http://localhost:3000/choices
//! curl -X POST --data "choice_text=B&questionId=2" http://localhost:3000/choices
//! curl -X POST --data "choice_text=C&questionId=2" http://localhost:3000/choices

//! curl -X POST --data "choice_text=A&questionId=3" http://localhost:3000/choices
//! curl -X POST --data "choice_text=B&questionId=3" http://localhost:3000/choices
//! curl -X POST --data "choice_text=A and B&questionId=3" http://localhost:3000/choices

//! curl -X POST --data "choice_text=Yes&questionId=4" http://localhost:3000/choices
//! curl -X POST --data "choice_text=No&questionId=4" http://localhost:3000/choices
//! curl -X POST --data "choice_text=Maybe&questionId=4" http://localhost:3000/choices

//! curl -X POST --data "choice_text=Red&questionId=5" http://localhost:3000/choices
//! curl -X POST --data "choice_text=White&questionId=5" http://localhost:3000/choices
//! curl -X POST --data "choice_text=Blue&questionId=5" http://localhost:3000/choices

//! curl -X POST --data "choice_text=Answer&questionId=6" http://localhost:3000/choices
//! curl -X POST --data "choice_text=No answer&questionId=6" http://localhost:3000/choices
//! curl -X POST --data "choice_text=I hate answers&questionId=6" http://localhost:3000/choices

//! curl -X POST --data "choice_text=I love it&questionId=7" http://localhost:3000/choices
//! curl -X POST --data "choice_text=I hate it&questionId=7" http://localhost:3000/choices
//! curl -X POST --data "choice_text=It is okay&questionId=7" http://localhost:3000/choices

//! curl -X POST --data "choice_text=Happy&questionId=8" http://localhost:3000/choices
//! curl -X POST --data "choice_text=Sad&questionId=8" http://localhost:3000/choices
//! curl -X POST --data "choice_text=Mad&questionId=8" http://localhost:3000/choices

//! curl -X POST --data "choice_text=Up&questionId=9" http://localhost:3000/choices
//! curl -X POST --data "choice_text=Down&questionId=9" http://localhost:3000/choices
//! curl -X POST --data "choice_text=All around&questionId=9" http://localhost:3000/choices

//! curl -X POST --data "choice_text=Option one&questionId=10" http://localhost:3000/choices
//! curl -X POST --data "choice_text=Option two&questionId=10" http://localhost:3000/choices

//! curl -X POST --data "choice_text=A&questionId=11" http://localhost:3000/choices
//! curl -X POST --data "choice_text=B&questionId=11" http://localhost:3000/choices
//! curl -X POST --data "choice_text=C&questionId=11" http://localhost:3000/choices

//! curl -X POST --data "choice_text=Yes&questionId=12" http://localhost:3000/choices
//! curl -X POST --data "choice_text=No&questionId=12" http://localhost:3000/choices
//! curl -X POST --data "choice_text=Always&questionId=12" http://localhost:3000/choices