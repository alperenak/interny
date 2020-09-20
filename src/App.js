import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/*** Components ***/
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import SearchSection from "./components/SearchSection";
import Modal from "./components/Modal";
import Messenger from "./components/Messenger";
import CvCreate from "./components/CV/cvCreate";

/*** Screens ***/
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
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
import Dashboard from "./screens/EmployerDashboard";
import MyTasks from "./screens/MyTasks";
import Packages from "./screens/Packages";
import MyCourses from "./screens/MyCourses";
import FrequentlyAskedQuestions from "./screens/FAQ";
import CourseDetail from "./screens/CourseDetail";

/*** Styles ***/
import styles from "./app.scss";

/*** Utils ***/
import { eraseCookie, getCookie } from "./utils/cookie";
import store from "./store";

class App extends React.Component {
  state = {
    isAuthorized: true,
    user: {},
    userType: "",
    modal: {
      header: "",
      declaration: "",
      content: {},
      buttons: [],
      visibility: false,
      isInternshipBegun: false,
      selectedJobID: null,
    },
  };

  selectJobID(selectedJobID, callback = () => null) {
    this.setState({ selectedJobID }, callback.bind(this))
  }

  async componentDidMount() {
    await this.getUser();
  }

  getUser = async () => {
    if (getCookie("token")) {
      let userType = getCookie("user");
      if (userType === "intern") {
        let res = await store.getIntern(getCookie("user_id"));
        if (res.status && res.status === 200) {
          this.setState({
            user: res.data,
            isAuthorized: true,
            userType: userType,
            isInternshipBegun: !!Object.keys(res.data.ApprovedJob).length,
          });
          return res;
        }
      } else if (userType === "employer") {
        let res = await store.getEmployer(getCookie("user_id"));
        if (res.status && res.status === 200) {
          this.setState({
            user: res.data,
            isAuthorized: true,
            userType: userType,
          });
          return res;
        }
      }
    } else {
      eraseCookie(["token", "user", "user_id"]);
      this.setState({ isAuthorized: false });
    }
  };

  createModal = ({ header, declaration, content, buttons }) => {
    this.setState({
      modal: { header, declaration, content, buttons, visibility: true },
    });
  };

  closeModal = () => {
    this.setState({
      modal: { header: "", declaration: "", visibility: false },
    });
  };

  render() {
    let { isAuthorized, user, modal, userType, isInternshipBegun, selectedJobID } = this.state;
    return (
      <div className={`${styles.App} ${styles.fullScreen}`}>
        <Router>
          <Route
            path="/"
            render={(props) => (
              <TopBar
                isAuthorized={isAuthorized}
                isInternshipBegun={isInternshipBegun}
                user={user}
                {...props}
              />
            )}
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
              <UserHome v-if={userType === "intern"} />
              <Dashboard v-if={userType === "employer"} />
            </Route>
            <Route v-else exact path="/">
              <SearchSection v-if={!isAuthorized} page={"home"} />
              <Home />
            </Route>
            <Route
              path="/search/:keyword/:location"
              render={(props) => <LandingPageSearch {...props} />}
            />
            <Route
              path="/search"
              render={(props) => <LandingPageSearch {...props} />}
            />
            <Route
              path="/faq"
              render={(props) => <FrequentlyAskedQuestions {...props} />}
            />
            <Route
              path="/packages"
              render={(props) => <Packages {...props} />}
            />
            <Route
              path="/signup"
              render={(props) => (
                <SignUp
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/login/:user"
              render={(props) => (
                <Login
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/myAccount"
              render={(props) => (
                <MyAccount
                  user={user}
                  getUser={this.getUser}
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/postdetail/:id"
              render={(props) => (
                <PostDetail
                  getUser={this.getUser}
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/CVs"
              render={(props) => (
                <CVs
                  getUser={this.getUser}
                  user={user}
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route path="/cvcreate"
              render={props => <CvCreate getUser={this.getUser} user={user} closeModal={this.closeModal} createModal={this.createModal} {...props} />}
            />
            <Route path="/coverletters"
              render={(props) => (
                <CoverLetters
                  getUser={this.getUser}
                  user={user}
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              v-if={!(userType === "intern" && isInternshipBegun)}
              path="/myjobs"
              render={(props) => (
                <MyJobs
                  user={user}
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  selectJobID={this.selectJobID.bind(this)}
                  {...props}
                />
              )}
            />
            <Route
              path="/messages"
              render={(props) => (
                <Messenger
                  user={user}
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/mytasks"
              v-if={
                (userType === "intern" && isInternshipBegun) ||
                userType === "employer"
              }
              render={(props) => (
                <MyTasks
                  user={user}
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  selectedJobID={selectedJobID}
                  {...props}
                />
              )}
            />
            <Route
              path="/courses"
              v-if={
                (userType === "intern" && isInternshipBegun) ||
                userType === "employer"
              }
              render={(props) => (
                <MyCourses
                  user={user}
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/coursedetail/:id"
              render={(props) => (
                <CourseDetail
                  user={user}
                  closeModal={this.closeModal}
                  createModal={this.createModal}
                  {...props}
                />
              )}
            />
            <Route
              path="/jobapplication/:jobId"
              render={(props) => <JobApplication {...props} />}
            />
            <Route
              path="/faq"
              render={(props) => <FrequentlyAskedQuestions {...props} />}
            />
            <Route path="/error" render={(props) => <Error {...props} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
