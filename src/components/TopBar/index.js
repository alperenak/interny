import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
/*** Components ***/
import Card from "../Card";
import Button from "../Button";

/*** Utils ***/
import store from "../../store";
import { eraseCookie, getCookie } from "../../utils/cookie";

/*** Styles ***/
import styles from "./topBar.scss";

/*** Icons ***/
import internyLogo from "../../assets/interny-logo.png";
import userIcon from "../../icons/02-User-Oultine.svg";
import mailIcon from "../../icons/email-closed-outlined-back-envelope-interface-symbol.svg";
import bellIcon from "../../icons/notification-bell-outline-interface-symbol.svg";
import coverLetterIcon from "../../icons/file-rounded-outlined-symbol.svg";
import CVIcon from "../../icons/file-rounded-empty-sheet.svg";
import jobIcon from "../../icons/monitor-outline.svg";
import taskIcon from "../../icons/clipboard-square-symbol.svg";
import logOutIcon from "../../icons/logout.svg";
import caret from "../../icons/selectbox-blue.svg";
import bookIcon from "../../icons/book-outline.svg";
import wfaIcon from "../../icons/wfa.svg";
import HamburgerMenuIcon from "../../icons/menu-three-filled-rounded-lines-symbol.svg";
import SideBar from "../SideBar";

class TopBar extends Component {
  constructor(props) {
    super(props);

    this.wrapperRefuser = React.createRef();
    this.wrapperRefmail = React.createRef();
    this.wrapperRefbell = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.myRef = React.createRef()
  }

  state = {

    scrollTop: 0,

	pathname:"",
    isScrolled: false,

    mailDropDown: false,
    bellDropDown: false,
    userDropDown: false,
    loginDropDown: false,
    ourDropdown: false,
    ourPackages: [
      {
        key: "intern",
        value: <span><i>for</i> Intern</span>,
        selected: false,
        disabled: true,
        to: "/internyInterns",
      },
      {
        key: "company",
        value: <span><i>for</i> Company</span>,
        selected: false,
        disabled: true,
        to: "/internyBusiness",
      },
      {
        key: "university",
        value: <span><i>for</i> University</span>,
        selected: false,
        disabled: true,
        to: "/internyUniversity",
      },
    ],
    loginPages: [
      {
        key: "internLogin",
        value: "Intern",
        selected: false,
        disabled: true,
        to: "/login/Intern",
      },
      {
        key: "employerLogin",
        value: "Company",
        selected: false,
        disabled: true,
        to: "/login/Employer",
      },
      {
        key: "universityLogin",
        value: "University",
        selected: false,
        disabled: true,
        to: "/login/University",
      },
    ],
    mailSource: [],
    bellSource_temp: [],
    bellSource: [],
    internSource: [
      {
        key: "myAccount",
        value: "My Account",
        selected: false,
        icon: userIcon,
        to: "/myAccount",
      },
      {
        key: "myCompetency",
        value: "Competency",
        selected: false,
        icon: CVIcon,
        to: "/myCompetency",
      },
	  {
        key: "myJobs",
        value: "Jobs",
        selected: false,
        icon: CVIcon,
        to: "/myJobs",
      },
      {
        key: "coverLetter",
        value: "Cover Letter",
        selected: false,
        icon: coverLetterIcon,
        to: "/coverletters",
      },
      {
        key: "CVs",
        value: "CV",
        selected: false,
        icon: CVIcon,
        to: "/CVs",
      },
      {
        key: "myMessages",
        value: "Messages",
        selected: false,
        icon: mailIcon,
        to: "/messages",
      },
      {
        key: "Log Out",
        value: "Log Out",
        selected: false,
        icon: logOutIcon,
        to: "/logout",
        onChange: () => {
          eraseCookie(["token", "user", "user_id"]);
          window.location.pathname = "/";
        },
      },
    ],
    employerSource: [
      {
        key: "myAccount",
        value: "My Account",
        selected: false,
        icon: userIcon,
        to: "/myAccount",
      },
      {
        key: "internPool",
        value: "Intern Pool",
        selected: false,
        icon: CVIcon,
        to: "/internPool",
      },
      {
        key: "myJobs",
        value: "Jobs",
        selected: false,
        icon: CVIcon,
        to: "/myJobs",
      },
      {
        key: "myTasks",
        value: "Tasks",
        selected: false,
        icon: taskIcon,
        to: "/mytasks",
      },
      {
        key: "businessCourses",
        value: "e-Learning",
        selected: false,
        icon: bookIcon,
        to: "/businessCourses",
      },
      {
        key: "myMessages",
        value: "Messages",
        selected: false,
        icon: mailIcon,
        to: "/messages",
      },
      {
        key: "Log Out",
        value: "Log Out",
        selected: false,
        icon: logOutIcon,
        to: "/logout",
        onChange: () => {
          eraseCookie(["token", "user", "user_id"]);
          window.location.pathname = "/";
        },
      },
    ],
    icons: {
      userIcon,
      mailIcon,
      bellIcon,
    },
  };

  async componentDidMount() {

    document.addEventListener("mousedown", this.handleClickOutside);
    this.setSelectedPage();
    if (getCookie("token")) {
      if (getCookie("user") === "intern") {
        this.getUserSource();
      }
      let res = await store.getNotifications();
      let jobNotifications = res
        .filter((e) => e.type === "job")
        .map((notif) => {
          if(!notif.isRead){
            return {
              key: notif.id,
              value: notif.message,
              title: notif.title,
              selected: false,
              icon: bellIcon,
              unRead: !notif.isRead,
              onChange: this.onNotificationItemClick,
            };
          }
          else{
            return {
              key: notif.id,
              value: notif.message,
              title: notif.title,
              selected: false,
              icon: "",
              unRead: !notif.isRead,
              onChange: this.onNotificationItemClick,
            };
          }
        });
      let mailNotifications = res
        .filter((e) => e.type === "message")
        .map((notif) => {
          return {
            key: notif.id,
            value: notif.message,
            title: notif.title,
            selected: false,
            icon: "",
            unRead: !notif.isRead,
            onChange: () => this.onMailItemClick(),
          };
        });
      if (jobNotifications.length === 0) {
        jobNotifications = [
          {
            key: "myAccount",
            value: "There is no notification",
            selected: false,
            disabled: true,
          },
        ];
      }
      if (mailNotifications.length === 0) {
        mailNotifications = [
          {
            key: "myAccount",
            value: "There is no mail",
            selected: false,
            disabled: true,
          },
        ];
      }
      this.setState({
        bellSource_temp: jobNotifications,
        mailSource: mailNotifications,
      });

      let data = this.state.bellSource_temp.filter((item, i) => {
        return i < 3;
      });

      this.setState({ bellSource: data });
    }
    document.addEventListener("scroll", this.handleScroll);

  }

  componentDidUpdate(prevProps) {

    if (!Object.is(prevProps.location.pathname, this.props.location.pathname)) {
      this.setSelectedPage();
    }
    if (prevProps.isInternshipBegun !== this.props.isInternshipBegun) {
      this.getUserSource();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("scroll", this.handleScroll);
  }

  handleClickOutside = (event) => {
    if (
      this.wrapperRef?.current &&
      !this.wrapperRef?.current.contains(event.target)
    ) {
      this.setState({
        mailDropDown: false,
        bellDropDown: false,
        userDropDown: false,
      });
    }
  };

  getUserSource = () => {
    this.setState((state) => {
      if (this.props.isInternshipBegun) {
        state.internSource = state.internSource.filter(
          (e) =>
            e.key !== "myTasks" &&
            e.key !== "myJobs" &&
            e.key !== "myCourses" &&
            e.key !== "wfa"
        );
		    state.internSource.splice(2, 0, {
          key: "myJobs",
          value: "My Jobs",
          selected: false,
          icon: CVIcon,
          to: "/myJobs",
        });
        state.internSource.splice(3, 0, {
          key: "myTasks",
          value: "My Tasks",
          selected: false,
          icon: taskIcon,
          to: "/mytasks",
        });
        state.internSource.splice(4, 0, {
          key: "myCourses",
          value: "e-Learning",
          selected: false,
          icon: bookIcon,
          to: "/courses",
        });
        state.internSource.splice(5, 0, {
          key: "wfa",
          value: "WFA",
          selected: false,
          icon: wfaIcon,
          to: `/internDetail/${getCookie("user_id")}`,
        });
      } else {
        state.internSource = state.internSource.filter(
          (e) =>
            e.key !== "myTasks" &&
            e.key !== "myJobs" &&
            e.key !== "myCourses" &&
            e.key !== "wfa"
        );
        state.internSource.splice(3, 0, {
          key: "myJobs",
          value: "My Jobs",
          selected: false,
          icon: jobIcon,
          to: "/myJobs",
        });
      }
      return state;
    });
  };

  renderIcon(iconName, position) {
    let { icons } = this.state;
    let userType = getCookie("user");
    let notificaionCount = 0;
    if (userType)
      notificaionCount =
        this.state[`${iconName === "user" ? userType : iconName}Source`]
          .length > 0
          ? this.state[
              `${iconName === "user" ? userType : iconName}Source`
            ].filter((e) => e?.unRead).length
          : 0;
    return (
      <div
        ref={this[`wrapperRef${iconName}`]}
        onClick={() => this.onIconClick(iconName)}
        className={"topBar__hamburgerMenu__hamburgerAccountTools__img"}
      >
        <div v-if={notificaionCount > 0} className={"count"}>
          {notificaionCount}
        </div>
        <img src={icons[`${iconName}Icon`]} alt={"icon"} />
        <div
          v-if={this.state[`${iconName}DropDown`]}
          className={`${"cardContainer"} ${
            position ? position : ""
          }`}
        >
          <Card
            type={"dropDown"}
            iconName={iconName}
            onPress={() => this.closeHamburgerMenu()}
            externalData={[
              ...this.state[
                `${iconName === "user" ? userType : iconName}Source`
              ],
            ]}
          />
        </div>
      </div>
    );
  }

  setSelectedPage = () => {
    let userType = getCookie("user");
	this.setState({
		pathname:this.props.location.pathname
	})
    if (userType) {
      this.state[`${userType}Source`].map(
        (e) => (e.selected = e.to === this.props.location.pathname)
      );
      this.state.loginPages.map(
        (e) => (e.selected = e.to === this.props.location.pathname)
      );
      this.setState({
        [`${userType}Source`]: this.state[`${userType}Source`],
        loginPages: this.state.loginPages,
      });
    }
  };

  onIconClick = (name) => {
    let { mailDropDown, bellDropDown, userDropDown } = this.state;
    this.setState((state) => {
      state.mailDropDown = name === "mail" ? !mailDropDown : false;
      state.bellDropDown = name === "bell" ? !bellDropDown : false;
      state.userDropDown = name === "user" ? !userDropDown : false;
      return state;
    });
  };

  onNotificationItemClick = async () => {
    await store.readNotifications();
    window.location.pathname = "/myJobs";
  };
  onMailItemClick = () => {
    store.readNotifications();
    window.location.pathname = "/messages";
  };

  isSreenMatch() {
    return window.matchMedia("(max-width: 576px)").matches;
  }
  openHamburgerMenu() {
    this.isSreenMatch()
      ? (document.getElementById("hamburger-menu").style.width = "100%")
      : (document.getElementById("hamburger-menu").style.width = "50%");
  }
  closeHamburgerMenu() {
    document.getElementById("hamburger-menu").style.width = "0";
  }

  handleScroll = () => {
    const scrollY = window.scrollY

	if (window.scrollY > 1) {
      this.setState({isScrolled: true});
    } else {
      this.setState({isScrolled: false});
    }


  };

	render() {

		const {
			scrollTop
		} = this.state

		let { isAuthorized, user } = this.props;
		let { loginDropDown, ourDropdown } = this.state;
		let userType = getCookie("user");
		let topBarClass = "";
		if(this.state.pathname == "/"){
			topBarClass = this.state.isScrolled ? `${"topBar"} ${"topBar__fullScreen"} ${"topBar__scroll"}` : `${"topBar"} ${"topBar__fullScreen"} ${"topBar__nonscroll"}`;
		}else{
			topBarClass = `${"topBar"} ${"topBar__fullScreen"} ${"topBar__scroll"}`;
		}
		return (
			<div className={topBarClass} >
				<div class="container">
					<div class="row">
						<div class="col-md-2 col-6">
							<div className={"topBar__logo"}>
								<Link to={"/"}>
									<img src={internyLogo} alt={"logo"} />
								</Link>
							</div>
						</div>
						<div className="col-md-10 col-6 topBar__rightSide">
							<div className={"topBar__hamburgerMenu"}>
								<img
									className={"topBar__hamburgerMenu__hamburgerMenuIcon"}
									onClick={() => this.openHamburgerMenu()}
									src={HamburgerMenuIcon}
									alt={"hamburgerMenu"}
								/>
								<SideBar type={"hamburgerMenu"}>
									<Fragment v-if={!isAuthorized}>
										{/*<div><Link to={'/'}>Home</Link></div>*/}
										<div className={"topBar__hamburgerMenu__hamburgerLinks"}>
											<div>
												<Link
													onClick={() => this.closeHamburgerMenu()}
													to={"/search"}
												>
													Internships
												</Link>
											</div>
											<div>
												<Link
													onClick={() => this.closeHamburgerMenu()}
													to={"/packages"}
												>
													Our Packages
												</Link>
											</div>
										</div>
										<div className={"topBar__hamburgerMenu__hamburgerButtons"}>
											<div
												onClick={() =>
													this.setState({ loginDropDown: !this.state.loginDropDown })
												}
												className={"topBar__hamburgerMenu__dropdownContainer"}
											>
												<Button
													type={"ghost"}
													sizeName={"small"}
													text={"Login"}
													iconPosition={"left"}
													responsive={"hamburger"}
													icon={caret}
												/>
												<div v-if={loginDropDown} className={"topBar__hamburgerMenu__dropdown"}>
													<Card
														onPress={() => {
															this.closeHamburgerMenu();
															this.setState({
																loginDropDown: !this.state.loginDropDown,
															});
                            }}
														type={"dropDown"}
														externalData={this.state.loginPages}
													/>
												</div>
											</div>
											<Button
												to="/signup"
												type={"secondary"}
												sizeName={"small"}
												responsive={"hamburger"}
												text={"Sign Up"}
												onButtonClick={() => this.closeHamburgerMenu()}
											/>
										</div>
									</Fragment>
									<Fragment v-else>
										<div
											className={"topBar__hamburgerMenu__hamburgerAccountName"}
											style={{ cursor: "default" }}
										>
											Welcome,{" "}
											<span className={"topBar__hamburgerMenu__hamburgerAccountName__userName"}>
												{userType === "intern" ? user.name : user.accountName}{" "}
												{userType === "intern" && user.surname}
											</span>
										</div>
										<div className={"topBar__hamburgerMenu__hamburgerAccountTools"}>
											{this.renderIcon("mail", "mail")}
											{this.renderIcon("bell", "bell")}
											{this.renderIcon("user", "user")}
										</div>
									</Fragment>
								</SideBar>
							</div>
							<div className={"topBar__links"}>
								<Fragment v-if={!isAuthorized}>
									<div>
										<Link to={"/search"} className={this.state.isScrolled ? "topBar__links__scroll" : "topBar__links__nonscroll"}>Internships</Link>
									</div>
									<div
										onMouseOver={() => this.setState({ ourDropdown: true })}
										onMouseLeave={() => this.setState({ ourDropdown: false })}
										className={"topBar__links__dropdownContainer"}
									>
										<Button
											type={"link"}
											sizeName={"default"}
											text={"\u00a0\u00a0How to Use\u00a0\u00a0"}
											textClass={this.state.isScrolled ? "topBar__links__scroll" : "topBar__links__nonscroll"}
										/>
										<div v-if={ourDropdown} className={"topBar__links__dropdownContainer__dropdown"}>
											<Card type={"dropDown"} externalData={this.state.ourPackages} />
										</div>
									</div>
									<div
										onMouseOver={() => this.setState({ loginDropDown: true })}
										onMouseLeave={() => this.setState({ loginDropDown: false })}
										className={"topBar__links__dropdownContainer"}
									>
										<Button
											type={"primary"}
											sizeName={"small"}
											text={"\u00a0\u00a0Login\u00a0\u00a0"}
										/>
										<div v-if={loginDropDown} className={"topBar__links__dropdownContainer__dropdown"}>
											<Card type={"dropDown"} externalData={this.state.loginPages} />
										</div>

									</div>
									<Button
										to="/signup"
										type={"secondary"}
										sizeName={"small"}
										text={"Sign Up"}
									/>
								</Fragment>
								<Fragment v-else>
									<div style={{ cursor: "default" }}>
										Welcome,{" "}
										<span className={"topBar__links__userName"}>
											{userType === "intern" ? user.name : user.accountName}{" "}
											{userType === "intern" && user.surname}
										</span>
									</div>
									{this.renderIcon("mail")}
									{this.renderIcon("bell")}
									{this.renderIcon("user")}
								</Fragment>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default TopBar;
