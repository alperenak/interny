import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*** Styles ***/
import styles from './companyProfileCard.scss';

/*** Icons ***/
import locationIcon from "../../../../icons/location-dark.svg";

class CompanyProfile extends Component {
    render() {
        let {profileObject} = this.props;
        return (
            <div className={styles.companyProfileCard}>
                <div className={styles.profileImage}>
                    <img src={profileObject.image} alt={'profile photo'}/>
                </div>
                <div className={styles.headerText}>
                    {profileObject.header}
                </div>
                <div className={styles.location}>
                    <img src={locationIcon} alt={'location'}/>
                    {profileObject.location}
                </div>
                <div className={styles.sections}>
                    <div className={styles.title}>Sector:</div>
                    <div className={styles.text}>{profileObject.sector}</div>
                </div>
                <div className={styles.sections}>
                    <div className={styles.title}>Job Type:</div>
                    {profileObject.jobType}
                </div>
                <div className={styles.sections}>
                    <div className={styles.title}>Number of Emp:</div>
                    {profileObject.empNum}
                </div>
                <div className={styles.description}>
                    {profileObject.description}
                </div>
            </div>
        );
    }
}

export default CompanyProfile;

CompanyProfile.propTypes = {
    profileObject: PropTypes.object.isRequired
};

CompanyProfile.defaultProps = {
    profileObject: {}
};
