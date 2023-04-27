const express = require("express");
const router = express.Router();
const { Choice } = require("../models");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

//* View the choices
//^ curl -H "accept: application/json" http://localhost:3000/choices
router.get("/", async (req, res) => {
  const choices = await Choice.findAll();
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(choices);
  } else {
    res.render("choice/index", { choices });
  }
});

//* Form
router.get("/new", (req, res) => {
  res.render("choice/create");
});

//* Create a new choice
//^ curl -H "accept: application/json" -X POST --data "choice_text=AA" http://localhost:3000/choices
router.post("/", async (req, res) => {
  const { choice_text } = req.body;
  const choice = await Choice.create({ choice_text });
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(choice);
  } else {
    res.redirect("/choices/" + choice.id);
  }
});

//* View a single choice by id
//^ curl -H "accept: application/json" -X GET http://localhost:3000/choices/1
router.get("/:id", async (req, res) => {
  const choice = await Choice.findByPk(req.params.id);
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(choice);
  } else {
    res.render("choice/show", { choice });
  }
});

//* Form
router.get("/:id/edit", async (req, res) => {
  const choice = await Choice.findByPk(req.params.id);
  res.render("choice/edit", { choice });
});

//* Update/Edit a choice by id
//^ curl -H "accept: application/json" -X POST --data "choice_text=Choice A" http://localhost:3000/choices/1
router.post("/:id", async (req, res) => {
  const { choice_text } = req.body;
  const { id } = req.params;
  const choice = await Choice.update(
    { choice_text },
    {
      where: { id },
    }
  );
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(choice);
  } else {
    res.redirect("/choices/" + id);
  }
});

//* Delete a choice by id
//^ curl -H "accept: application/json" -X GET http://localhost:3000/choices/8/delete
router.get("/:id/delete", async (req, res) => {
  const { id } = req.params;
  const deleted = await Choice.destroy({
    where: { id },
  });
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json({'success': true});
  } else {
    res.redirect("/choices");
  }
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