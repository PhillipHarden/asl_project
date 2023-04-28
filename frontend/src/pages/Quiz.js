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
        <h1 className="mb-4">{quiz.name}</h1>
        <div>
          {quiz.Questions.map((q) => (
            <div key={q.id}>
              <p className="h4 my-3">{q.question_text}</p>
              <div>
                <p>
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
                </p>
              </div>
            </div>
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
