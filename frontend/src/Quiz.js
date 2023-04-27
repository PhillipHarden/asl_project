import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const [quiz, setQuiz] = useState({ Questions: [] });
  const params = useParams();

  useEffect(() => {
    async function fetchQuiz() {
      const q = await axios(`http://localhost:3000/quizzes/${params.id}`, {
        headers: {
          token: localStorage.token,
        },
      });
      console.log(q);
      console.log(q.data);
      setQuiz(q.data);
    }
    fetchQuiz();
  }, []);

  return (
    <form id="quiz">
      <h1>{quiz.name} Quiz</h1>
      <ul>
        {quiz.Questions.map((q) => (
          <li key={q.id}>
            <h3>{q.question_text}</h3>
            <ul>
              <li>
                {q.Choices.map((c) => (
                  <div key={c.id}>
                    <input type="radio" name={"question_" + q.id} required />
                    <label>{c.choice_text}</label>
                  </div>
                ))}
              </li>
            </ul>
          </li>
        ))}
      </ul>
      <button type="submit">Submit Quiz</button>
    </form>
  );
};

export default Quiz;
