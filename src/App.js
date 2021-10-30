import React from "react";
import { BrowserRouter as Router, Switch, Route }from"react-router-dom";
import "./App.css";
import NavigationComponent from "./components/Nav/Nav.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import LoginPage from "./pages/LoginPage";
import CreateProjectPage from "./pages/CreateProjectPage";

function App() {
  return (
    <Router>
      <div>
      <NavigationComponent />

      <Switch>
      <Route path="/project/:id">
        <ProjectPage />
        </Route>
         <Route path="/login">
        <LoginPage />
        </Route>
        <Route path="/createprojectpage">
        <CreateProjectPage />
        </Route>
        <Route exactpath="/">
        <HomePage />
        </Route>
       </Switch>
      </div>
    </Router>
  );
}

export default App;