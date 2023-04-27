const express = require("express");
const router = express.Router();
// const { Choice } = require("../models");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
const { isAuthenticated } = require("../middlewares/auth");
const { Choice, Question } = require("../models");

//* View the choices
//^ curl -H "accept: application/json" http://localhost:3000/choices
// router.get("/", async (req, res) => {
//   const choices = await Choice.findAll();
//   if (req.headers.accept.indexOf("/json") > -1) {
//     res.json(choices);
//   } else {
//     res.render("choice/index", { choices });
//   }
// });

router.get('/', async (req, res) => {
	const choices = await Choice.findAll({
		include: Question
	})
	res.json(choices)
})






//* Form
router.get("/new", (req, res) => {
  res.render("choice/create");
});

//* Create a new choice
//^ curl -H "accept: application/json" -X POST --data "name=AA" http://localhost:3000/choices
router.post("/", async (req, res) => {
  const { name } = req.body;
  const choice = await Choice.create({ name });
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
//^ curl -H "accept: application/json" -X POST --data "name=Choice A" http://localhost:3000/choices/1
router.post("/:id", async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const choice = await Choice.update(
    { name },
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