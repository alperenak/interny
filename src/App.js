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
import CV from "./screens/CV";

/*** Styles ***/
import styles from './app.scss';
import Login from "./screens/Login";

/*** Utils ***/
import {getCookie} from "./utils/cookie";
import PostDetail from "./screens/PostDetail";
import store from "./store";

class App extends React.Component {
    state = {
        isAuthorized: false,
        user: {}
    };

    async componentDidMount() {
        if (getCookie('token')) {
            if (getCookie('user') === 'intern') {
                let intern = await store.getIntern(getCookie('user_id'));
                this.setState({user: intern});
            }
            this.setState({isAuthorized: true});
        } else {
            this.setState({isAuthorized: false});
        }
    }

    render() {
        let {isAuthorized, user} = this.state;
        return (
            <div className={`${styles.App} ${styles.fullScreen}`}>
                <Router>
                    <TopBar isAuthorized={isAuthorized} user={user} />
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
                        <Route path="/CV">
                            <CV user={user}/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
