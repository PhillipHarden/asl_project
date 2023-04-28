import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import queryString from "querystring";
import HeroImage from "../images/hero.jpg";

const Home = () => {
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
      <h1 className="mb-4">Welcome to Takin' Quizzes!!</h1>
      <img
        src={HeroImage}
        alt="Image of a woman ready to take a quiz"
        className="hero-image img-fluid"
      />
    </div>
  );
};

export default Home;
