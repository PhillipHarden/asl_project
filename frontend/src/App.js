import "./styles/App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Quizzes from "./pages/Quizzes";
import queryString from "querystring";

const App = () => {
  const [jwt, setJwt] = useState("");
  useEffect(() => {
    async function fetchJwt() {
      const params = queryString.parse(
        window.location.search.replace(/^\?/, "")
      );
      console.log(localStorage.token);
      console.log(params.token);
      localStorage.token = params.token;
      console.log(localStorage.token);
      console.log(params.token);
      const response = await axios("http://localhost:3000/auth/token/", {
        headers: {
          token: localStorage.token,
        },
      });
      setJwt(response.data.token);
    }
    fetchJwt();
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar isLoggedIn={jwt ? true : false} />
        <div className="container mt-4">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Quizzes" element={<Quizzes />} />
            <Route exact path="/quizzes/:id" element={<Quiz />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
