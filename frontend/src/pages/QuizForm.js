import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const QuizForm = () => {
  const [quizData, setQuizData] = useState({
    id: "",
    name: "",
    weight: "",
    questions: [
      {
        questionId: "",
        question_text: "",
        quizId: "",
        choices: [{ id: "", choice_text: "", choiceQuestionId: "" }],
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuestionChange = (e, questionIndex) => {
    const { name, value } = e.target;
    setQuizData((prevState) => {
      const questions = [...prevState.questions];
      questions[questionIndex] = {
        ...questions[questionIndex],
        [name]: value,
      };
      return {
        ...prevState,
        questions,
      };
    });
  };

  const handleChoiceChange = (e, questionIndex, choiceIndex) => {
    const { value } = e.target;
    setQuizData((prevState) => {
      const questions = [...prevState.questions];
      const choices = [...questions[questionIndex].choices];
      choices[choiceIndex] = {
        ...choices[choiceIndex],
        choice_text: value,
        questionId: questions[questionIndex].id, // Set questionId for the choice
      };
      questions[questionIndex] = {
        ...questions[questionIndex],
        choices,
      };
      return {
        ...prevState,
        questions,
      };
    });
  };

  const addQuestion = () => {
    console.log({ quizData });
    if (quizData.id) {
      console.log("question has quizid");
    }
    setQuizData((prevState) => {
      return {
        ...prevState,
        questions: [
          ...prevState.questions,
          {
            id: uuidv4(),
            question_text: "",
            quizId: quizData.id, // Set quizId for the new question
            choices: [{ id: uuidv4(), choice_text: "", questionId: "" }],
          },
        ],
      };
    });
  };

  const addChoice = (questionIndex) => {
    setQuizData((prevState) => {
      const questions = [...prevState.questions];
      questions[questionIndex].choices.push({
        choiceId: uuidv4(),
        choice_text: "",
        questionId: questions[questionIndex].id, // Set questionId for the new choice
      });
      return {
        ...prevState,
        questions,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send quizData to your backend or perform further actions
    // console.log(quizData);
    // console.log(JSON.stringify(quizData));
    // console.log(JSON.stringify(quizData, null, 2));
  };

  const renderQuestion = (currentQuestion, questionIndex) => {
    if (quizData.id !== "") return;
    // has id move forward
    console.log("has quiz data id")
    if (currentQuestion.questionId !== "") return;
    // current question has id move forward
    console.log("has current question")
    return (
      <div key={currentQuestion.id}>
        <label>
          Question:
          <input
            type="text"
            name="question_text" // Changed from "text" to "question_text"
            value={currentQuestion.question_text}
            onChange={(e) => handleQuestionChange(e, questionIndex)}
          />
        </label>

        {currentQuestion.choices.map((choice, choiceIndex) => (
          <div key={choice.choiceId}>
            <label>
              Choice:
              <input
                type="text"
                value={choice.choice_text}
                onChange={(e) =>
                  handleChoiceChange(e, questionIndex, choiceIndex)
                }
              />
            </label>
          </div>
        ))}

        <button type="button" onClick={() => addChoice(questionIndex)}>
          Add Choice
        </button>
      </div>
    );
  };

  //   const renderChoice(){

  //   }

  const checkQuizId = () => {
    if (quizData.id !== "") return;

    const newId = uuidv4();
    setQuizData((prevState) => {
      return {
        ...prevState,
        id: newId,
      };
    });
  };

  useEffect(() => {
    checkQuizId();
  }, []);

  console.log(quizData);
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
      <label>
        Quiz Weight:
        <input
          type="text"
          name="weight"
          value={quizData.weight}
          onChange={handleChange}
        />
      </label>

      {quizData.id &&
        quizData.questions.map((question, questionIndex) =>
          renderQuestion(question, questionIndex)
        )}

      <button type="button" onClick={addQuestion}>
        Add Question
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default QuizForm;

// import React, { useState } from "react";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// const QuizForm = () => {
//   const [quizData, setQuizData] = useState({
//     quizId: uuidv4(),
//     name: "",
//     weight: "",
//     questions: [
//       {
//         questionId: uuidv4(),
//         question_text: "",
//         quizId: "",
//         choices: [{ choiceId: uuidv4(), choice_text: "", questionId: "" }],
//       },
//     ],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setQuizData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleQuestionChange = (e, questionIndex) => {
//     const { name, value } = e.target;
//     setQuizData((prevState) => {
//       const questions = [...prevState.questions];
//       questions[questionIndex] = {
//         ...questions[questionIndex],
//         [name]: value,
//       };
//       return {
//         ...prevState,
//         questions,
//       };
//     });
//   };

//   const handleChoiceChange = (e, questionIndex, choiceIndex) => {
//     const { value } = e.target;
//     setQuizData((prevState) => {
//       const questions = [...prevState.questions];
//       const choices = [...questions[questionIndex].choices];
//       choices[choiceIndex] = {
//         ...choices[choiceIndex],
//         text: value,
//       };
//       questions[questionIndex] = {
//         ...questions[questionIndex],
//         choices,
//       };
//       return {
//         ...prevState,
//         questions,
//       };
//     });
//   };

//   const addQuestion = () => {
//     setQuizData((prevState) => ({
//       ...prevState,
//       questions: [
//         ...prevState.questions,
//         {
//           questionId: uuidv4(),
//           text: "",
//           choices: [{ choiceId: uuidv4(), question_text: "" }],
//         },
//       ],
//     }));
//   };

//   const addChoice = (questionIndex) => {
//     setQuizData((prevState) => {
//       const questions = [...prevState.questions];
//       questions[questionIndex].choices.push({
//         choiceId: uuidv4(),
//         choice_text: "",
//       });
//       return {
//         ...prevState,
//         questions,
//       };
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Send quizData to your backend or perform further actions
//     console.log(quizData);
//     console.log(quizData.questions);
//     console.log(quizData.questions.choices);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Quiz Name:
//         <input
//           type="text"
//           name="name"
//           value={quizData.name}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Quiz Weight:
//         <input
//           type="text"
//           name="weight"
//           value={quizData.weight}
//           onChange={handleChange}
//         />
//       </label>

//       {quizData.questions.map((question, questionIndex) => (
//         <div key={question.questionId}>
//           <label>
//             Question:
//             <input
//               type="text"
//               name="text"
//               value={question.text}
//               onChange={(e) => handleQuestionChange(e, questionIndex)}
//             />
//           </label>

//           {question.choices.map((choice, choiceIndex) => (
//             <div key={choice.choiceId}>
//               <label>
//                 Choice:
//                 <input
//                   type="text"
//                   value={choice.text}
//                   onChange={(e) =>
//                     handleChoiceChange(e, questionIndex, choiceIndex)
//                   }
//                 />
//               </label>
//             </div>
//           ))}

//           <button type="button" onClick={() => addChoice(questionIndex)}>
//             Add Choice
//           </button>
//         </div>
//       ))}

//       <button type="button" onClick={addQuestion}>
//         Add Question
//       </button>

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default QuizForm;

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Send quizData to your backend or perform further actions
//     try {
//       // Make separate POST requests for Quiz, Questions, and Choices
//       const quizResponse = await axios.post('/api/quizzes', { quizData });
//       const { quizId } = quizResponse.data;

//       const questionPromises = quizData.questions.map(async (question) => {
//         const { questionId, text } = question;
//         const questionResponse = await axios.post('/api/questions', { quizId, questionId, text });
//         const { questionId: createdQuestionId } = questionResponse.data;

//         const choicePromises = question.choices.map(async (choice) => {
//           const { choiceId, text } = choice;
//           await axios.post('/api/choices', { questionId: createdQuestionId, choiceId, text });
//         });

//         await Promise.all(choicePromises);
//       });

//       await Promise.all(questionPromises);

//       console.log(quizData);
//       console.log('Quiz, Questions, and Choices successfully sent to the server.');
//     } catch (error) {
//       console.error('Error occurred while sending data to the server:', error);
//     }
//   };
