import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const Quiz = () => {
  const [quiz, setQuiz] = useState({ Questions: [] });
  const params = useParams();
  const formMethods = useForm();

  useEffect(() => {
    async function fetchQuiz() {
      const q = await axios(`http://localhost:3000/quizzes/${params.id}`, {
        headers: {
          token: localStorage.token,
        },
      });
      setQuiz(q.data);
    }
    fetchQuiz();
  }, []);

  return (
    <div className="mb-5">
      <form id="quiz">
        <h1 className="mb-4">{quiz.name}</h1>
        <div>
          {quiz.Questions.map((q) => (
            <ul key={q.id} className="no-style">
              <li className="h4 my-3">{q.question_text}</li>
              <ul className="no-style">
                <li>
                  {q.Choices.map((c) => (
                    <div key={c.id}>
                      <label>
                        <input
                          type="radio"
                          name={"question_" + q.id}
                          required
                          className="form-check-input me-1"
                        />
                        {c.choice_text}
                      </label>
                    </div>
                  ))}
                </li>
              </ul>
            </ul>
          ))}
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default Quiz;
