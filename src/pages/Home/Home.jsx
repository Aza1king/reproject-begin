import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="welcome">
      <h1>Добро пожаловать</h1>
      <h3>Здес вы можете ознакомится и получит информациию о студентах </h3>
      <Link className="userlink" to="/users">
        Students
      </Link>
    </div>
  );
};

export default Home;
