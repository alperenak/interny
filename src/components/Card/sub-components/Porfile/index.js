import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*** Utils ***/
import store from "../../../../store";
import {getCookie} from "../../../../utils/cookie";
import Button from "../../../../components/Button";
/*** Styles ***/
import styles from './profileCard.scss';

/*** Icons ***/
import locationIcon from "../../../../icons/location.svg";
import addIcon from "../../../../icons/add-circular-outlined-white-button.svg";

class Profile extends Component {
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
            <div className={"profileCard"}>
                <div v-if={profileObject.avatar != 'none'} className={"profileImage"}>
                    <div v-if={profileObject.avatar} className={"imageContainer"}>
                        <img src={profileObject.avatar} alt={'profile photo'}/>
                    </div>
                    <label v-if={userType === 'intern'}  className={profileObject.avatar ? "statusCircle" : "fileInput"} htmlFor="fileInput">
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
                <div className={"profileHeader"}>
                    <div className={"headerText"}>
                        {profileObject.header}
                    </div>
                    <div className={"location"}>
                        <img src={locationIcon} alt={'location'}/>
                        {profileObject.location}
                    </div>
                </div>
				<div className={"profileButton"}>
					<Button
						type={"ghost"}
						text={"Edit"}
						sizeName={"small"}
						width={"80px"}
						to={"/myAccount"}
					/>
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
