import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

/*** Components ***/
import Card from "../Card";
import Button from "../Button";

/*** Styles ***/
import styles from './topBar.scss';

/*** Icons ***/
import internyLogo from '../../assets/interny-logo.png';
import userIcon from '../../icons/02-User-Oultine.svg';
import mailIcon from '../../icons/email-closed-outlined-back-envelope-interface-symbol.svg';
import bellIcon from '../../icons/notification-bell-outline-interface-symbol.svg';
import coverLetterIcon from '../../icons/file-rounded-outlined-symbol.svg';
import CVIcon from '../../icons/file-rounded-empty-sheet.svg';

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
        userSource: [
            {
                key: 'myAccount',
                value: 'My Account',
                selected: false,
                icon: userIcon,
                to: '/',
                onChange: (e) => this.handleClickOutside(e)
            },
            {
                key: 'coverLetter',
                value: 'Cover Letter',
                selected: false,
                icon: coverLetterIcon,
                to: '/',
                onChange: (e) => this.handleClickOutside(e)
            },
            {
                key: 'CV',
                value: 'CV',
                selected: window.location.pathname === '/CV',
                icon: CVIcon,
                to: '/CV',
                onChange: (e) => this.handleClickOutside(e)
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
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
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
        return (
            <div ref={this.wrapperRef} onClick={() => this.onIconClick(iconName)} className={styles.img}>
                <img src={icons[`${iconName}Icon`]} alt={'icon'} />
                <div v-if={this.state[`${iconName}DropDown`]} className={styles.cardContainer}>
                    <Card
                        type={'dropDown'}
                        externalData={this.state[`${iconName}Source`]}
                    />
                </div>
            </div>
        );
    }

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
        return (
            <div className={`${styles.TopBar} ${styles.fullScreen}`}>
                <div className={styles.logo}><Link to={'/'}><img src={internyLogo} alt={'logo'} /></Link></div>
                <div className={styles.links}>
                    <Fragment v-if={!isAuthorized}>
                        <div><Link to={'/'}>Home</Link></div>
                        <div><Link to={'/Posts'}>Browse Internships</Link></div>
                        {this.renderPackagesLink()}
                        <Button to="/logIn" type={'ghost'} sizeName={'small'} text={'Login'} />
                        <Button to="/signUp" type={'secondary'} sizeName={'small'} text={'Sign Up'} />
                    </Fragment>
                    <Fragment v-else>
                        <div>Welcome, <span className={styles.userName}>{user.name} {user.surname}</span></div>
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
