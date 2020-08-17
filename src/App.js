import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

/*** Components ***/
import TopBar from "./components/TopBar";

/*** Screens ***/
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import Posts from "./screens/Posts";
import UserHome from "./screens/UserHome";
import CVs from "./screens/CVs";
import CoverLetters from "./screens/CoverLetters";
import JobApplication from "./screens/JobApplication";

/*** Styles ***/
import styles from './app.scss';
import Login from "./screens/Login";

/*** Utils ***/
import {eraseCookie, getCookie} from "./utils/cookie";
import PostDetail from "./screens/PostDetail";
import store from "./store";
import SearchSection from "./components/SearchSection";
import MyJobs from "./screens/MyJobs";

class App extends React.Component {
    state = {
        isAuthorized: true,
        user: {}
    };

    async componentDidMount() {
        if (getCookie('token')) {
            if (getCookie('user') === 'intern') {
                let res = await store.getIntern(getCookie('user_id'));
                if (res.status && res.status === 200) {
                    this.setState({user: res.data, isAuthorized: true});
                }
            }
        } else {
            eraseCookie(['token', 'user', 'user_id']);
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
                        <Route v-if={isAuthorized} exact path="/">
                            <UserHome />
                        </Route>
                        <Route v-else exact path="/">
                            <SearchSection v-if={!isAuthorized} page={'home'} />
                            <Home />
                        </Route>
                        <Route path="/signup">
                            <SignUp />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/posts">
                            <Posts />
                        </Route>
                        <Route path="/postdetail/:id">
                            <PostDetail />
                        </Route>
                        <Route path="/CVs">
                            <CVs user={user}/>
                        </Route>
                        <Route path="/coverletters">
                            <CoverLetters user={user}/>
                        </Route>
                        <Route path="/myjobs">
                            <MyJobs />
                        </Route>
                        <Route
                            path="/jobapplication/:jobId"
                            render={props => <JobApplication {...props} />}
                        />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
