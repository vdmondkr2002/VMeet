import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import JoiningPage from "./components/JoiningPage/JoiningPage";

const App = () => {
  return (
    <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/join" component={JoiningPage}/>
        </Switch>
        <Footer />
    </Router>
  );
};


export default App;
