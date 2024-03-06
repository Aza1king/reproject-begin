import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Main.css";

const Main = () => {
  return (
    <>
      <header className="main-header">
        <Link to="/" className="main-link">
          Home
        </Link>
        <Link to="/users" className="main-link">
          Users
        </Link>
        <Link to="/AddUser" className="main-link">
          Add Users
        </Link>
      </header>
      <Outlet />
    </>
  );
};

export default Main;
