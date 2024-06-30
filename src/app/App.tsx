import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "../widgets/Header";
import { Content } from "./Content";
import { FilmDetailPage } from "../widgets/MovieDetails/index";
import "./app.css"
import { Provider, useDispatch } from "react-redux";
import store from "../store/index"
import {setAuthenticated} from "../store/slice/auth/index"
import {getAuthToken} from "../shared/auth/auth"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      dispatch(setAuthenticated(true));
    } else {
      dispatch(setAuthenticated(false));
    }
  }, [dispatch]);
  
  return (
    <Provider store={store}>
      <Router>
        <div className="content">
          <Header />
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/film/:id" element={<FilmDetailPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
