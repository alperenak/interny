import React, {Component} from 'react';
import {Link} from "react-router-dom";

/*** Styles ***/
import styles from './sideBar.scss';

/*** Icons ***/
import internyLogo from '../../assets/tinyLogo.png';

class SideBar extends Component {
    render() {
        return (
            <div className={styles.SideBar}>
                <div className={styles.logo}><Link to={'/'}><img src={internyLogo} alt={'logo'} /></Link></div>
            </div>
        );
    }
}

export default SideBar;
