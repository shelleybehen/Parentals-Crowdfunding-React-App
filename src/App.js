import React from 'react';
import { BrowserRouter as Router, Switch, Route }from'react-router-dom';
import './App.css';
import NavigationComponent from './components/Nav/Nav.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateProjectPage from './pages/CreateProjectPage';
import Footer from './components/Footer/Footer'
import ForbiddenPage from "./pages/ForbiddenPage";


function App() {
  return (
    <Router>
      <div>
      <NavigationComponent />

      <Switch>
      <Route path='/project/:id'>
        <ProjectPage />
        </Route>
        <Route path='/login'>
        <LoginPage />
        </Route>
        <Route path='/users'>
        <RegisterPage />
        </Route>
        <Route path='/createprojectpage'>
        <CreateProjectPage />
        </Route>
        <Route exactpath='/'>
        <HomePage />
        </Route>
        <Route path="/forbiddenPage">
            <ForbiddenPage />
        </Route>
       </Switch>
          <Footer>

          </Footer>
      </div>
    </Router>
  );
}


export default App;