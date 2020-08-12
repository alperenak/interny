import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/*** Components ***/
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";

/*** Screens ***/
import Home from "./screens/Home";

/*** Styles ***/
import styles from './app.scss';

/*** Icon ***/

class App extends React.Component {
    state = {
        isAuthorized: false
    };

    render() {
        let {isAuthorized} = this.state;
        return (
            <div className={`${styles.App} ${!isAuthorized ? styles.fullScreen : ''}`}>
                <TopBar isAuthorized={isAuthorized} />
                <SideBar v-if={isAuthorized} />
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
