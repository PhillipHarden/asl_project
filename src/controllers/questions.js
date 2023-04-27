const express = require("express");
const router = express.Router();
const { Question } = require("../models");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
const { isAuthenticated } = require("../middlewares/auth");

//* View the questions
router.get("/", isAuthenticated, async (req, res) => {
  const questions = await Question.findAll();
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(questions);
  } else {
    res.render("question/index", { questions });
  }
});

//* Form
router.get("/new", isAuthenticated, (req, res) => {
  res.render("question/create");
});

//* Create a new question
router.post("/", isAuthenticated, async (req, res) => {
  const { name } = req.body;
  const question = await Question.create({ name });
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(question);
  } else {
    res.redirect("/questions/" + question.id);
  }
});

//* View a single question by id
router.get("/:id", isAuthenticated, async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(question);
  } else {
    res.render("question/show", { question });
  }
});

//* Form
router.get("/:id/edit", isAuthenticated, async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  res.render("question/edit", { question });
});

//* Update/Edit a question by id
router.post("/:id", isAuthenticated, async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const question = await Question.update(
    { name },
    {
      where: { id },
    }
  );
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json(question);
  } else {
    res.redirect("/questions/" + id);
  }
});

//* Delete a question by id
router.get("/:id/delete", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const deleted = await Question.destroy({
    where: { id },
  });
  if (req.headers.accept.indexOf("/json") > -1) {
    res.json({'success': true});
  } else {
    res.redirect("/questions");
  }
});

module.exports = router;