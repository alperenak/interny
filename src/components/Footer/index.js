import React, {Component} from 'react';
import {Link} from "react-router-dom";

/*** Styles ***/
import styles from "./footer.scss";

/*** Utils ***/
import {getCookie} from "../../utils/cookie";

/*** Icons ***/
import internyLogo from "../../assets/interny-logo-white.png";
import facebook from "../../icons/facebook.svg";
import twitter from "../../icons/twitter.svg";
import linkedin from "../../icons/linkedin.svg";
import appStore from "../../icons/app-store-badge.svg";
import googlePlay from "../../icons/google-play-badge.svg";
import location from "../../icons/location-white.svg";

class Footer extends Component {
    render() {
        return (
            <div className={styles.footerSection}>
                <div className={styles.footerTop}>
                    <div className={styles.companyDescription}>
                        <img src={internyLogo}/>
                        <div
                            style={{ fontStyle: 'italic', marginBottom: '17px', fontSize: '17px', }}
                            className={styles.description}
                        >
                            "The way to be a global intern"
                        </div>
                        <div className={styles.description}>
                            Provides a complete online service for anyone looking for a new internship worldwide.
                            We are not a recruitment agency.
                            We are an online internship platform that supports the intern and the company from the beginning to the end of the internship process.
                        </div>
                        <div className={styles.stores}>
                            <a href={'/'} className={styles.store}><img src={appStore} alt={'store'}/></a>
                            <a href={'/'} className={styles.store}><img src={googlePlay} alt={'store'}/></a>
                        </div>
                        <div className={styles.followUs}>
                            <a href={'https://www.facebook.com/internynet/'} target={'blank'}><img src={facebook} alt={facebook} /></a>
                            <a href={'https://twitter.com/internynet/'} target={'blank'}><img src={twitter} alt={twitter} /></a>
                            <a href={'https://www.linkedin.com/company/internynet/'} target={'blank'}><img src={linkedin} alt={linkedin} /></a>
                        </div>
                    </div>
                    <div className={styles.options}>
                        <div className={styles.knowUs}>
                            <div className={styles.header}>Know Us</div>
                            <ul>
                                <li v-if={!getCookie('token')}><Link to="/signup" >Register</Link></li>
                                <li><Link to="/" >About Us</Link></li>
                                <li> <Link to="/faq" >FAQ's</Link></li>
                                <li><Link to="/faq" >Terms and Policies</Link></li>
                                <li><Link to="/faq" >Privacy Policy</Link></li>
                                <li><Link to="/faq" >Help Center</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.stroke} />
                <div className={styles.rights}>
                    2020 • INTERNY Inc. © All rights reserved.
                    <div className={styles.location}>
                        <img src={location} alt={'location'} />
                        <div>{`NL TR UK USA`}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
