import React, {Component} from 'react';

/*** Components ***/
import Button from "../Button";

/*** Styles ***/
import styles from './topBar.scss';

/*** Icons ***/
import internyLogo from '../../assets/interny-logo.png'

class TopBar extends Component {
    state = {

    };

    render() {
        let {isAuthorized} = this.props;
        return (
            <div className={`${styles.TopBar} ${!isAuthorized ? styles.fullScreen : ''}`}>
                <div className={styles.logo}><img src={internyLogo} alt={'logo'} /></div>
                <div className={styles.links}>
                    <div>Home</div>
                    <div>Browse Internships</div>
                    <div>Our Packages</div>
                    <Button type={'ghost'} sizeName={'small'} text={'Join Us'} />
                    <Button type={'secondary'} sizeName={'small'} text={'Sign In'} />
                </div>
            </div>
        );
    }
}

export default TopBar;
