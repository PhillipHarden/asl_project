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
    <div className="mb-5">
      <form id="quiz">
        <h1 className="mb-4">{quiz.name} Quiz</h1>
        <ul className="no-style">
          {quiz.Questions.map((q) => (
            <li key={q.id} className="">
              <p className="h4 my-3">{q.question_text}</p>
              <ul className="no-style">
                <li>
                  {q.Choices.map((c) => (
                    <div key={c.id} className="list-group">
                      <label className="list-group-item">
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
            </li>
          ))}
        </ul>
        <button type="submit" className="btn btn-primary">
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default Quiz;