import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

/*** Components ***/
import Button from "../Button";

/*** Styles ***/
import styles from './topBar.scss';

/*** Icons ***/
import internyLogo from '../../assets/interny-logo.png';
import userIcon from '../../icons/02-User-Oultine.svg';
import mailIcon from '../../icons/email-closed-outlined-back-envelope-interface-symbol.svg';
import bellIcon from '../../icons/notification-bell-outline-interface-symbol.svg';

class TopBar extends Component {
    renderPackagesLink() {
        return <div onClick={() => {
            if (window.location.pathname.length > 1) document.location.pathname = '/';
            document.getElementById('packages-section').scrollIntoView({behavior: "smooth"});
        }}>
            Our Packages
        </div>
    }

    render() {
        let {isAuthorized} = this.props;
        return (
            <div className={`${styles.TopBar} ${!isAuthorized ? styles.fullScreen : ''}`}>
                <div className={styles.logo}><Link v-if={!isAuthorized}  to={'/'}><img src={internyLogo} alt={'logo'} /></Link></div>
                <div className={styles.links}>
                    <Fragment v-if={!isAuthorized}>
                        <div><Link to={'/'}>Home</Link></div>
                        <div><Link to={'/Posts'}>Browse Internships</Link></div>
                        {this.renderPackagesLink()}
                        <Button to="/logIn" type={'ghost'} sizeName={'small'} text={'Login'} />
                        <Button to="/signUp" type={'secondary'} sizeName={'small'} text={'Sign Up'} />
                    </Fragment>
                    <Fragment v-else>
                        <div><Link to={'/'}>Welcome, <span className={styles.userName}>Ekrem Şanslı</span></Link></div>
                        <Link to="/logIn"><div className={styles.img}><img src={mailIcon} alt={'icon'} /></div></Link>
                        <Link to="/logIn"><div className={styles.img}><img src={bellIcon} alt={'icon'} /></div></Link>
                        <Link to="/logIn"><div className={styles.img}><img src={userIcon} alt={'icon'} /></div></Link>
                    </Fragment>
                </div>
            </div>
        );
    }
}

export default TopBar;
