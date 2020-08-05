import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*** Styles ***/
import styles from './profileCard.scss';

/*** Icons ***/
import locationIcon from "../../../../icons/location.svg";

class Profile extends Component {
    render() {
        let {profileObject} = this.props;
        return (
            <div className={styles.profileCard}>
                <div className={styles.profileImage}>
                    <img src={profileObject.image} alt={'profile photo'}/>
                    <div className={`${styles.statusCircle} ${styles[profileObject.status]}`} />
                </div>
                <div className={styles.profileHeader}>
                    <div className={styles.headerText}>
                        {profileObject.header}
                    </div>
                    <div className={styles.location}>
                        <img src={locationIcon} alt={'location'}/>
                        {profileObject.location}
                    </div>
                </div>
                <div className={styles.profileProperties}>
                    <div className={styles.propertyContainer}>
                        <div className={styles.property}>{profileObject.sector}</div>
                        <div className={styles.propertyTitle}>Sector</div>
                    </div>
                    <div className={styles.stroke}/>
                    <div className={styles.propertyContainer}>
                        <div className={styles.property}>{profileObject.jobType}</div>
                        <div className={styles.propertyTitle}>Job Type</div>
                    </div>
                    <div className={styles.stroke}/>
                    <div className={styles.propertyContainer}>
                        <div className={styles.property}>{profileObject.education}</div>
                        <div className={styles.propertyTitle}>Education</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;

Profile.propTypes = {
  profileObject: PropTypes.object.isRequired
};

Profile.defaultProps = {
  profileObject: {}
};
