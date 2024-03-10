import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import store from "./redux/store";

import { Home, Main, UsersDetail, UsersList } from "./pages/index.js";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Main />}>
            <Route element={<Home />} path="/" />
            <Route element={<UsersList />} path="/users" />
            <Route element={<UsersDetail />} path="/user/:id" />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
