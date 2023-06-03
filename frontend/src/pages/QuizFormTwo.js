import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const QuizFormTwo = () => {
  const [quizData, setQuizData] = useState({
    quizId: uuidv4(),
    name: '',
    questions: [
      {
        questionId: uuidv4(),
        text: '',
        choices: ['']
      }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleQuestionChange = (e, questionIndex) => {
    const { name, value } = e.target;
    setQuizData((prevState) => {
      const questions = [...prevState.questions];
      questions[questionIndex] = {
        ...questions[questionIndex],
        [name]: value
      };
      return {
        ...prevState,
        questions
      };
    });
  };

  const handleChoiceChange = (e, questionIndex, choiceIndex) => {
    const { value } = e.target;
    setQuizData((prevState) => {
      const questions = [...prevState.questions];
      questions[questionIndex].choices[choiceIndex] = value;
      return {
        ...prevState,
        questions
      };
    });
  };

  const addQuestion = () => {
    setQuizData((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        {
          questionId: uuidv4(),
          text: '',
          choices: ['']
        }
      ]
    }));
  };

  const addChoice = (questionIndex) => {
    setQuizData((prevState) => {
      const questions = [...prevState.questions];
      questions[questionIndex].choices.push('');
      return {
        ...prevState,
        questions
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send quizData to your backend or perform further actions
    console.log(quizData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Quiz Name:
        <input
          type="text"
          name="name"
          value={quizData.name}
          onChange={handleChange}
        />
      </label>

      {quizData.questions.map((question, questionIndex) => (
        <div key={question.questionId}>
          <label>
            Question:
            <input
              type="text"
              name="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(e, questionIndex)}
            />
          </label>

          {question.choices.map((choice, choiceIndex) => (
            <div key={uuidv4()}>
              <label>
                Choice:
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => handleChoiceChange(e, questionIndex, choiceIndex)}
                />
              </label>
            </div>
          ))}

          <button type="button" onClick={() => addChoice(questionIndex)}>
            Add Choice
          </button>
        </div>
      ))}

      <button type="button" onClick={addQuestion}>
        Add Question
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default QuizFormTwo;
