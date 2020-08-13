import React, {Component} from 'react';
import {Link} from "react-router-dom";

/*** Components ***/
import Button from "../Button";

/*** Styles ***/
import styles from './topBar.scss';

/*** Icons ***/
import internyLogo from '../../assets/interny-logo.png'

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
                <div className={styles.logo}><Link to={'/'}><img src={internyLogo} alt={'logo'} /></Link></div>
                <div className={styles.links}>
                    <div><Link to={'/'}>Home</Link></div>
                    <div><Link to={'/Posts'}>Browse Internships</Link></div>
                    {this.renderPackagesLink()}
                    <Button to="/logIn" type={'ghost'} sizeName={'small'} text={'Login'} />
                    <Button to="/signUp" type={'secondary'} sizeName={'small'} text={'Sign Up'} />
                </div>
            </div>
        );
    }
}

export default TopBar;
