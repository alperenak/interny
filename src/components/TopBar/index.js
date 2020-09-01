import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

/*** Components ***/
import Card from "../Card";
import Button from "../Button";

/*** Utils ***/
import {eraseCookie, getCookie} from "../../utils/cookie";

/*** Styles ***/
import styles from './topBar.scss';

/*** Icons ***/
import internyLogo from '../../assets/interny-logo.png';
import userIcon from '../../icons/02-User-Oultine.svg';
import mailIcon from '../../icons/email-closed-outlined-back-envelope-interface-symbol.svg';
import bellIcon from '../../icons/notification-bell-outline-interface-symbol.svg';
import coverLetterIcon from '../../icons/file-rounded-outlined-symbol.svg';
import CVIcon from '../../icons/file-rounded-empty-sheet.svg';
import jobIcon from '../../icons/monitor-outline.svg';
import taskIcon from '../../icons/clipboard-square-symbol.svg';
import logOutIcon from '../../icons/logout.svg';
import caret from '../../icons/selectbox-blue.svg';

class TopBar extends Component {
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    state = {
        mailDropDown: false,
        bellDropDown: false,
        userDropDown: false,
        loginDropDown: false,
        loginPages: [
            {
                key: 'internLogin',
                value: 'Login as Intern',
                selected: false,
                disabled: true,
                to:'/login/Intern',
            },
            {
                key: 'employerLogin',
                value: 'Login as Employer',
                selected: false,
                disabled: true,
                to:'/login/Employer',
            }
        ],
        mailSource: [
            {
                key: 'myAccount',
                value: 'There is no mail',
                selected: false,
                disabled: true
            },
        ],
        bellSource: [
            {
                key: 'myAccount',
                value: 'There is not news',
                selected: false,
                disabled: true
            },
        ],
        internSource: [
            {
                key: 'myAccount',
                value: 'My Account',
                selected: false,
                icon: userIcon,
                to: '/myAccount'
            },
            {
                key: 'coverLetter',
                value: 'Cover Letter',
                selected: false,
                icon: coverLetterIcon,
                to: '/coverletters'
            },
            {
                key: 'CVs',
                value: 'CVs',
                selected: false,
                icon: CVIcon,
                to: '/CVs'
            },
            {
                key: 'myJobs',
                value: 'My Jobs',
                selected: false,
                icon: jobIcon,
                to: '/myJobs'
            },
            {
                key: 'myTasks',
                value: 'My Tasks',
                selected: false,
                icon: taskIcon,
                to: '/mytasks'
            },
            {
                key: 'myMessages',
                value: 'Messages',
                selected: false,
                icon: mailIcon,
                to: '/messages'
            },
            {
                key: 'Log Out',
                value: 'Log Out',
                selected: false,
                icon: logOutIcon,
                to: '/logout',
                onChange: () => {
                    eraseCookie(['token', 'user', 'user_id']);
                    window.location.pathname = '/';
                }
            },
        ],
        employerSource: [
            {
                key: 'myAccount',
                value: 'My Account',
                selected: false,
                icon: userIcon,
                to: '/myAccount'
            },
            {
                key: 'myJobs',
                value: 'Jobs',
                selected: false,
                icon: CVIcon,
                to: '/myJobs'
            },
            {
                key: 'myTasks',
                value: 'Tasks',
                selected: false,
                icon: taskIcon,
                to: '/mytasks'
            },
            {
                key: 'myMessages',
                value: 'Messages',
                selected: false,
                icon: mailIcon,
                to: '/messages'
            },
            {
                key: 'Log Out',
                value: 'Log Out',
                selected: false,
                icon: logOutIcon,
                to: '/logout',
                onChange: () => {
                    eraseCookie(['token', 'user', 'user_id']);
                    window.location.pathname = '/';
                }
            },
        ],
        icons: {
            userIcon,
            mailIcon,
            bellIcon
        }
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.setSelectedPage();
    }

    componentDidUpdate(prevProps) {
        if (!Object.is(prevProps.location.pathname, this.props.location.pathname)) {
            this.setSelectedPage();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
            this.setState({
                mailDropDown: false,
                bellDropDown: false,
                userDropDown: false
            });
        }
    };

    renderPackagesLink() {
        return <div className={styles.packages} onClick={() => {
            if (window.location.pathname.length > 1) document.location.pathname = '/';
            document.getElementById('packages-section').scrollIntoView({behavior: "smooth"});
        }}>
            Our Packages
        </div>
    }

    renderIcon(iconName) {
        let {icons} = this.state;
        let userType = getCookie('user');
        return (
            <div ref={this.wrapperRef} onClick={() => this.onIconClick(iconName)} className={styles.img}>
                <img src={icons[`${iconName}Icon`]} alt={'icon'} />
                <div v-if={this.state[`${iconName}DropDown`]} className={styles.cardContainer}>
                    <Card
                        type={'dropDown'}
                        externalData={this.state[`${iconName === 'user' ? userType : iconName}Source`]}
                    />
                </div>
            </div>
        );
    }

    setSelectedPage = () => {
        let userType = getCookie('user');
        if (userType) {
            this.state[`${userType}Source`].map(e => e.selected = e.to === this.props.location.pathname);
            this.state.loginPages.map(e => e.selected = e.to === this.props.location.pathname);
            this.setState({ [`${userType}Source`]: this.state[`${userType}Source`], loginPages: this.state.loginPages });
        }
    };

    onIconClick = (name) => {
        let {mailDropDown, bellDropDown, userDropDown} = this.state;
        this.setState({
            mailDropDown: name === 'mail' ? !mailDropDown : false,
            bellDropDown: name === 'bell' ? !bellDropDown : false,
            userDropDown: name === 'user' ? !userDropDown : false,
        });
    };

    render() {
        let {isAuthorized, user} = this.props;
        let {loginDropDown} = this.state;
        let userType = getCookie('user');
        return (
            <div className={`${styles.TopBar} ${styles.fullScreen}`}>
                <div className={styles.logo}><Link to={'/'}><img src={internyLogo} alt={'logo'} /></Link></div>
                <div className={styles.links}>
                    <Fragment v-if={!isAuthorized}>
                        <div><Link to={'/'}>Home</Link></div>
                        <div><Link to={'/search'}>Browse Internships</Link></div>
                        {this.renderPackagesLink()}
                        <div
                            onMouseOver={() => this.setState({loginDropDown: true})}
                            onMouseLeave={() => this.setState({loginDropDown: false})}
                            className={styles.dropdownContainer}
                        >
                            <Button
                                type={'ghost'}
                                sizeName={'small'}
                                text={'Login'}
                                iconPosition={'left'}
                                icon={caret}
                            />
                            <div v-if={loginDropDown} className={styles.dropdown}>
                                <Card
                                    type={'dropDown'}
                                    externalData={this.state.loginPages}
                                />
                            </div>
                        </div>
                        <Button
                            to="/signup"
                            type={'secondary'}
                            sizeName={'small'}
                            text={'Sign Up'}
                        />
                    </Fragment>
                    <Fragment v-else>
                        <div style={{cursor: 'default'}}>
                            Welcome, <span className={styles.userName}>
                            {userType === 'intern' ? user.name : user.accountName} {userType === 'intern' && user.surname}
                        </span>
                        </div>
                        {this.renderIcon('mail')}
                        {this.renderIcon('bell')}
                        {this.renderIcon('user')}
                    </Fragment>
                </div>
            </div>
        );
    }
}

export default TopBar;
