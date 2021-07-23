import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import JoiningPage from "./components/JoiningPage/JoiningPage";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/auth";

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(loadUser())
  },[])
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
