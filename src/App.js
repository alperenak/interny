import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CookieConsent from 'react-cookie-consent-notification';

/*** Components ***/
import TopBar from "./components/TopBar";
import SearchSection from "./components/SearchSection";
import Modal from "./components/Modal";
import Messenger from "./components/Messenger";
import CvCreate from "./components/CV/cvCreate";
import LoadingModal from "./components/LoadingModal";

/*** Screens ***/
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import Affiliate from "./screens/Affiliate";
import UserHome from "./screens/UserHome";
import CVs from "./screens/CVs/index.js";
import CVList from "./screens/CVs/list.js";
import CoverLetters from "./screens/CoverLetters";
import JobApplication from "./screens/JobApplication";
import LandingPageSearch from "./screens/LandingPageSearch";
import MyJobs from "./screens/MyJobs/index.js";
import MyJobs2 from "./screens/MyJobs/index2.js";
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
import UniverstyDashboard from "./screens/universtyDashboard/universtyDashboard";
import InternDetail from "./screens/InternDetail";
import UpdatePassword from "./screens/UpdatePassword";
import Cookies from "./screens/Cookies"
import ReferrenceLetter from "./screens/ReferrenceLetter";
import ReferrenceLetterLetter from "./screens/ReferrenceLetterLetter";
import HelpCenter from "./screens/HelpCenter";
import HelpCenterDetail from "./screens/HelpCenter/detail.js";
import HelpCenterDetail2 from "./screens/HelpCenter/detail2.js";
import AboutUs from "./screens/AboutUs";
import BusinessPage from "./screens/internyPages/business.js";
import UniversityPage from "./screens/internyPages/university.js";
import InvestorPage from "./screens/internyPages/investor.js";

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
    loading: true,
    modal: {
      header: "",
      declaration: "",
      size: 'small',
      backgroundColor: '#fff',
      content: {},
      buttons: [],
      visibility: false,
      isInternshipBegun: false,
      /*default: null*/
      selectedJobID: '5f640f3dc782454860f792f1',
    },
    consentTaken: false,

  };

  selectJobID(selectedJobID, callback = () => null) {
    this.setState({ selectedJobID }, callback.bind(this))
  }

  async componentDidMount() {
    await this.getUser();
    this.setState({ loading: false });
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

  createModal = ({ header, declaration, backgroundColor = '#fff', content, buttons, size = 'small' }) => {
    this.setState({
      modal: { header, declaration, backgroundColor, content, buttons, size, visibility: true },
    });
  };

  closeModal = () => {
    this.setState({
      modal: { header: "", declaration: "", backgroundColor: '#fff', size: 'small', visibility: false },
    });
  };

  checkStatus = (status) => {
    if(status){
      this.setState({consentTaken:true})
    }
  }



	render() {
		let { isAuthorized, user, modal, userType, isInternshipBegun, selectedJobID, loading } = this.state;
		const cookieClass = this.state.consentTaken ? `${"hidden"} ${"myCookie"}` : "myCookie"
		const appClass = this.state.consentTaken ? `${"App"} ${"fullScreen"} ${"paddingTop"}` : `${"App"} ${"fullScreen"}`

		return (
			<div className={appClass}>
				<LoadingModal text="Loading" v-if={loading} />

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
						modalSize={modal.size}
						backgroundColor={modal.backgroundColor}
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
						<SearchSection v-if={!isAuthorized} page={"home"} consentTaken={this.state.consentTaken} />
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
						path="/universitydash"
						render={(props) => <UniverstyDashboard {...props} />}
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
							<CVList
								getUser={this.getUser}
								user={user}
								closeModal={this.closeModal}
								createModal={this.createModal}
								{...props}
							/>
						)}
					/>
					<Route
						path="/Cvdetail/:id"
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
					<Route
						path="/cvcreate"
						render={(props) => (
							<CvCreate
								getUser={this.getUser}
								user={user}
								closeModal={this.closeModal}
								createModal={this.createModal}
								{...props}
							/>
						)}
					/>
					<Route
						path="/coverletters"
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

						path="/jobs"
						render={(props) => (
							<MyJobs2
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
						path="/interndetail/:internId"
						render={(props) => <InternDetail {...props} />}
					/>
					<Route
						path="/faq"
						render={(props) => <FrequentlyAskedQuestions {...props} />}
					/>
					<Route
						path="/cookies"
						render={(props) => <Cookies {...props} />}
					/>
					<Route
						path="/aboutUs"
						render={(props) => <AboutUs {...props} />}
					/>
					<Route
						path="/referrenceLetter"
						render={(props) => <ReferrenceLetter {...props} />}
					/>
					<Route
						path="/referrenceLetterLetter"
						render={(props) => <ReferrenceLetterLetter {...props} />}
					/>
					<Route
						path="/helpCenter"
						render={(props) => <HelpCenter {...props} />}
					/>
					<Route
						path="/affiliate"
						render={(props) => <Affiliate {...props} />}
					/>
					<Route
						path="/helpCenterDetail"
						render={(props) => <HelpCenterDetail {...props} />}
					/>
					<Route
						path="/helpCenterDetail2"
						render={(props) => <HelpCenterDetail2 {...props} />}
					/>
					<Route
						path="/affiliate"
						render={(props) => <Affiliate {...props} />}
					/>
					<Route
						path="/internyBusiness"
						render={(props) => <BusinessPage {...props} />}
					/>
					<Route
						path="/internyUniversity"
						render={(props) => <UniversityPage {...props} />}
					/>
					<Route
						path="/investor"
						render={(props) => <InvestorPage {...props} />}
					/>
					<Route
						v-if={!getCookie('token')}
						path="/updatepassword/:userType/:verificationKey"
						render={(props) =>
							<UpdatePassword
								{...props}
								closeModal={this.closeModal}
								createModal={this.createModal}
							/>
						}
					/>
					<Route path="/error" render={(props) => <Error {...props} />} />
				</Switch>
			</Router>
      <CookieConsent
        consentFunction={this.checkStatus}
        className={cookieClass}
        buttonText={'Allow'}
        buttonBackground={'#EFF2FC'}
        buttonColor={'#112B49'}
      >
        This website uses cookies to improve
        service, for analytical and advertising purposes.
        Please read our <a href={'/cookies'} style={{color: '#EFF2FC'}}>Cookie Policy</a>.
        Confirm your consent to the use of cookies.
      </CookieConsent>
		</div>
		);
	}
}

export default App;
