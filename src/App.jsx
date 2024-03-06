import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddUserForm, UsersList, Home, Main, UserDetails } from "./components/index.js"; // Импортируем UserDetails
import store from "./redux/store";
import './App.css'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Main />}>
            <Route element={<Home />} path="/" />
            <Route element={<UsersList />} path="/users" />
            <Route element={<AddUserForm />} path="/AddUser" />
            <Route element={<UserDetails />} path="/user/:id" /> {/* Новый маршрут для UserDetails */}
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
