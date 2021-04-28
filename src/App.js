import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import './App.css';
import fakeData from "./fakeData.json"
import Header from './components/Header/Header';
import MainBody from './components/MainBody/MainBody';
import FindRiders from './components/FindRiders/FindRiders';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import LogIn from './components/LogIn/LogIn';
import Error from './components/error/Error';


export const travleContext = createContext()
function App() {

  const [transFort, setTransfort] = useState([])
  const [logInUser, setLogInUser] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    error: ""
  })


  useEffect(() => {
    setTransfort(fakeData)
  }, [])

  console.log(logInUser)
  return (
    <travleContext.Provider value={[transFort, logInUser, setLogInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <MainBody></MainBody>
          </Route>
          <Route path="/home">
            <MainBody></MainBody>
          </Route>
          <Route path="/logIn">
            <LogIn></LogIn>
          </Route>
          <PrivateRoute path="/destination">
            <Error></Error>
          </PrivateRoute>
          <PrivateRoute path="/transFort/:key">
            <FindRiders></FindRiders>
          </PrivateRoute>
        </Switch>
      </Router>
    </travleContext.Provider>
  );
}

export default App;
