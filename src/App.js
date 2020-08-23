import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

/*** Components ***/
import TopBar from "./components/TopBar";
import SearchSection from "./components/SearchSection";
import Modal from "./components/Modal";

/*** Screens ***/
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import Posts from "./screens/Posts";
import UserHome from "./screens/UserHome";
import CVs from "./screens/CVs";
import CoverLetters from "./screens/CoverLetters";
import JobApplication from "./screens/JobApplication";
import LandingPageSearch from "./screens/LandingPageSearch";
import MyJobs from "./screens/MyJobs";
import PostDetail from "./screens/PostDetail";
import Error from "./screens/Error";
import Login from "./screens/Login";
import MyAccount from "./screens/MyAccount";

/*** Styles ***/
import styles from './app.scss';

/*** Utils ***/
import {eraseCookie, getCookie} from "./utils/cookie";
import store from "./store";

class App extends React.Component {
    state = {
        isAuthorized: true,
        user: {},
        modal: {
            header: '',
            declaration: '',
            content: {},
            buttons: [],
            visibility: false
        }
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

    createModal = ({ header, declaration, content, buttons }) => {
        this.setState({ modal: {header, declaration, content, buttons, visibility: true}});
    };

    closeModal = () => {
        this.setState( { modal: {header: '', declaration: '', visibility: false} });
    };

    render() {
        let {isAuthorized, user, modal} = this.state;
        return (
            <div className={`${styles.App} ${styles.fullScreen}`}>
                <Router>
                    <Route
                        path="/"
                        render={props => <TopBar isAuthorized={isAuthorized} user={user} {...props} />}
                    />
                    <Modal
                        v-if={modal.visibility}
                        header={modal.header}
                        declaration={modal.declaration}
                        closeModal={this.closeModal}
                        content={modal.content}
                        buttons={modal.buttons}
                    />
                    <Switch>
                        <Route v-if={isAuthorized} exact path="/">
                            <UserHome />
                        </Route>
                        <Route v-else exact path="/">
                            <SearchSection v-if={!isAuthorized} page={'home'} />
                            <Home />
                        </Route>
                        <Route
                            path="/search/:keyword/:location"
                            render={props => <LandingPageSearch {...props} />}
                        />
                        <Route
                            path="/signup"
                            render={props => <SignUp {...props} />}
                        />
                        <Route
                            path="/login"
                            render={props => <Login closeModal={this.closeModal} createModal={this.createModal} {...props} />}
                        />
                        <Route
                            path="/myAccount"
                            render={props => <MyAccount user={user} closeModal={this.closeModal} createModal={this.createModal} {...props} />}
                        />
                        <Route path="/posts">
                            <Posts />
                        </Route>
                        <Route
                            path="/postdetail/:id"
                            render={props => <PostDetail {...props} />}
                        />
                        <Route path="/CVs"
                               render={props => <CVs user={user} closeModal={this.closeModal} createModal={this.createModal} {...props} />}
                        />
                        <Route path="/coverletters"
                               render={props => <CoverLetters user={user} closeModal={this.closeModal} createModal={this.createModal} {...props} />}
                        />
                        <Route path="/myjobs">
                            <MyJobs />
                        </Route>
                        <Route
                            path="/jobapplication/:jobId"
                            render={props => <JobApplication {...props} />}
                        />
                        <Route
                            path="/error"
                            render={props => <Error {...props} />}
                        />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
