import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";


const Main = () => {
  return (
    <>
      <header className="main-header">
        <Link to="/" className="main-link">
        <FontAwesomeIcon icon= 
        {faHouseChimney} />
        </Link>
      </header>
      <Outlet />
    </>
  );
};

export default Main;
