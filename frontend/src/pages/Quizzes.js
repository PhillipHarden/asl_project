import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import queryString from "querystring";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    async function fetchQuizes() {
      const params = queryString.parse(
        window.location.search.replace(/^\?/, "")
      );
      const response = await axios("http://localhost:3000/quizzes", {
        headers: {
          token: localStorage.token,
        },
      });
      setQuizzes(response.data);
    }
    fetchQuizes();
  }, []);
  return (
    <div className="text-center">
      <h1 className="mb-3">Take a Quiz!</h1>
      <p className="mb-5 h4">Check out these great quizzes!!</p>
      <div className="">
        {quizzes.map((q) => (
          <p key={q.id} className="h5">
            <Link to={"/quizzes/" + q.id} className="decoration-none list-link">
              {q.name}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
