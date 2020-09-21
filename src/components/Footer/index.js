import React, {Component} from 'react';

/*** Styles ***/
import styles from "./footer.scss";

/*** Icons ***/
import internyLogo from "../../assets/interny-logo.png";
import {Link} from "react-router-dom";
import {getCookie} from "../../utils/cookie";

class Footer extends Component {
    render() {
        return (
            <div className={styles.footerSection}>
                <div className={styles.footerTop}>
                    <div className={styles.companyDescription}>
                        <img src={internyLogo}/>
                        <div className={styles.description}>
                            Provides a full online service for anyone looking for a new internship.
                            We are not a recruitment agency, we are job site.
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
                        <div className={styles.followUs}>
                            <div className={styles.header}>Follow Us</div>
                            <ul>
                                <li>Facebook</li>
                                <li>Twitter</li>
                                <li>Linkedin</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.stroke} />
                <div className={styles.rights}>
                    2020 • Intern Academy © All rights reserved.
                </div>
            </div>
        );
    }
}

export default Footer;
