import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*** Utils ***/
import store from "../../../../store";

/*** Styles ***/
import styles from './companyProfileCard.scss';

/*** Icons ***/
import locationIcon from "../../../../icons/location-dark.svg";
import addIcon from '../../../../icons/add-circular-outlined-white-button.svg';

class CompanyProfile extends Component {
    onFileUpload = async (files) => {
        let uploadData = await store.uploadImageType(files[0].type);
        let res = await store.uploadImage(uploadData.url, files[0]);
        if (res) {
            await store.uploadImageKey(uploadData.key);
        }
        await this.props.getUser();
    };

    render() {
        let {profileObject} = this.props;
        return (
            <div className={styles.companyProfileCard}>
                <div className={styles.profileImage}>
                    <div v-if={profileObject.avatar || profileObject.logo} className={styles.imageContainer}>
                        <img src={profileObject.avatar || profileObject.logo} alt={'profile photo'}/>
                    </div>
                    <label className={profileObject.avatar || profileObject.logo ? styles.statusCircle : styles.fileInput} htmlFor="fileInput">
                        <img src={addIcon} alt={'icon'} />
                    </label>
                    <input
                        id={'fileInput'}
                        hidden={true}
                        accept={"image/*"}
                        type={'file'}
                        aria-label={""}
                        onChange={(e) => this.onFileUpload(e.target.files)}
                    />
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
