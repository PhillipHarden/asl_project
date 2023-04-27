const express = require("express");
const router = express.Router();
// const { Question } = require("../models");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
const { isAuthenticated } = require("../middlewares/auth");
const { Question, Quiz } = require("../models");

//* View the questions
// router.get("/", async (req, res) => {
//   const questions = await Question.findAll();
//   // if (req.headers.accept.indexOf("/json") > -1) {
//   //   res.json(questions);
//   // } else {
//   //   res.render("question/index", { questions });
//   // }
//   res.json(questions);
// });


// router.get("/", async (req, res) => {
//   const questions = await Question.findAll({
//     include: Quiz,
//   });
//   const quizzes = await Quiz.findAll();
//   // res.json(questions);
//   res.render("question/create", { quizzes: quizzes });
// });

router.get('/', async (req, res) => {
	const questions = await Question.findAll({
		include: Quiz
	})
	res.json(questions)
})




//* Form
router.get("/new",  (req, res) => {
  res.render("question/create");
});

//* Create a new question
router.post("/",  async (req, res) => {
  const { question_text, quizId } = req.body;
  const question = await Question.create({  question_text, quizId  });
  // if (req.headers.accept.indexOf("/json") > -1) {
  //   res.json(question);
  // } else {
  //   res.redirect("/questions/" + question.id);
  // }
  res.json(question);
});

//* View a single question by id
router.get("/:id",  async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  // if (req.headers.accept.indexOf("/json") > -1) {
  //   res.json(question);
  // } else {
  //   res.render("question/show", { question });
  // }
  res.json(question);
});



//* Form
router.get("/:id/edit",  async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  res.render("question/edit", { question });
});

//* Update/Edit a question by id
router.post("/:id",  async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const question = await Question.update(
    {  question_text, quizId  },
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
router.get("/:id/delete",  async (req, res) => {
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