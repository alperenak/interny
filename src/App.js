import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

/*** Components ***/
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";

/*** Screens ***/
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import Posts from "./screens/Posts";
import UserHome from "./screens/UserHome";

/*** Styles ***/
import styles from './app.scss';
import Login from "./screens/Login";

/*** Utils ***/
import {getCookie} from "./utils/cookie";
import PostDetail from "./screens/PostDetail";

class App extends React.Component {
    state = {
        isAuthorized: false
    };

    componentDidMount() {
        if (getCookie('token')) {
            this.setState({isAuthorized: true});
        } else {
            this.setState({isAuthorized: false});
        }
    }

    render() {
        let {isAuthorized} = this.state;
        return (
            <div className={`${styles.App} ${!isAuthorized ? styles.fullScreen : ''}`}>
                <Router>
                    <TopBar isAuthorized={isAuthorized} />
                    <SideBar v-if={isAuthorized} />
                    <Switch>
                        <Route v-if={!isAuthorized} exact path="/">
                            <Home />
                        </Route>
                        <Route v-else exact path="/">
                            <UserHome />
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
                        <Route path="/PostDetail/:id">
                            <PostDetail />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
