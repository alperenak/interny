import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/*** Components ***/
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";

/*** Screens ***/
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import Posts from "./screens/Posts";

/*** Styles ***/
import styles from './app.scss';
import Login from "./screens/Login";

/*** Icon ***/

class App extends React.Component {
    state = {
        isAuthorized: false
    };

    render() {
        let {isAuthorized} = this.state;
        return (
            <div className={`${styles.App} ${!isAuthorized ? styles.fullScreen : ''}`}>
                <Router>
                    <TopBar isAuthorized={isAuthorized} />
                    <SideBar v-if={isAuthorized} />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/signUp">
                            <SignUp />
                        </Route>
                        <Route path="/logIn">
                            <Login />
                        </Route>
                        <Route path="/Posts">
                            <Posts />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
