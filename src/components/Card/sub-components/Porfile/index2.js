import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*** Utils ***/
import store from "../../../../store";
import {getCookie} from "../../../../utils/cookie";

/*** Styles ***/
import styles from './profileCard2.scss';

/*** Icons ***/
import locationIcon from "../../../../icons/location.svg";
import addIcon from "../../../../icons/add-circular-outlined-white-button.svg";

class Profile2 extends Component {
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
        let userType = getCookie('user');
        return (
            <div className={styles.profileCard2}>
                <div className={styles.profileImage}>
                    <div v-if={profileObject.avatar} className={styles.imageContainer}>
                        <img src={profileObject.avatar} alt={'profile photo'}/>
                    </div>
                    <label v-if={userType === 'intern'}  className={profileObject.avatar ? styles.statusCircle : styles.fileInput} htmlFor="fileInput">
                        <img src={addIcon} alt={'icon'} />
                    </label>
                    <input
                        id={'fileInput'}
                        hidden={true}
                        accept="image/*"
                        type={'file'}
                        onChange={(e) => this.onFileUpload(e.target.files)}
                    />
                    {/*<div className={`${styles.statusCircle} ${styles[profileObject.status]}`} />*/}
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
                        <div className={styles.property}>{profileObject.position}</div>
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

export default Profile2;

Profile2.propTypes = {
  profileObject: PropTypes.object.isRequired
};

Profile2.defaultProps = {
  profileObject: {}
};
