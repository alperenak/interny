import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*** Components ***/
import Button from "../../../Button";
import EditForm from "./editForm";

/*** Styles ***/
import styles from "./profilesection.scss";

/*** Icons ***/
import addHoverIcon from '../../../../icons/add-circular-outlined-button.svg';
import addIcon from '../../../../icons/add-circular-outlined-black-button.svg';
import editIcon from "../../../../icons/note-outlined-symbol.svg";
import editHoverIcon from "../../../../icons/note-outlined-symbol-blue.svg";
import binIconBlue from "../../../../icons/recycling-bin-blue.svg";

/*** Utils ***/
import store from "../../../../store";

class ProfileSection extends Component {
    state = {
        activeEditForm: false
    };

    onFormCanceled = async () => {
        this.setState({activeEditForm: false});
        await this.props.getCVs();
    };

    render() {
        let {file} = this.props;
        let {activeEditForm} = this.state;
        let country = '';
        let city = '';
        if (file?.location) {
            country = file?.location.country;
            city = file?.location.city;
        }
        let location = country && city ? `${city} - ${country}` : (country ? `${country}` : city ? `${city}` : ``);
        return (
            <div className={styles.ProfileSection}>
                <div className={styles.name}>
                    {file.name}
                    <div className={styles.buttonsContainer}>
                        <Button
                            type={'ghost'}
                            text={'Delete CV'}
                            sizeName={'small'}
                            iconPosition={'center'}
                            onButtonClick={async () => {
                                await store.deleteCV(this.props.file.id);
                                await this.props.getCVs();
                            }}
                        />
                    </div>
                </div>
                <div className={styles.title}>{file.title}</div>
                <div v-if={location} className={styles.location}>{location}</div>
                <div className={styles.mail}>{file.email}</div>
                <div v-if={!activeEditForm} className={styles.summary}>
                    <Button
                        v-if={file.summary}
                        type={'link'}
                        icon={editIcon}
                        hoverIcon={editHoverIcon}
                        iconPosition={'left'}
                        text={file.summary}
                        onButtonClick={() => this.setState({activeEditForm: true})}
                    />
                    <Button
                        v-else
                        type={'link'}
                        icon={addIcon}
                        hoverIcon={addHoverIcon}
                        iconPosition={'left'}
                        text={'Add Summary'}
                        onButtonClick={() => this.setState({activeEditForm: true})}
                    />
                </div>
                <EditForm
                    v-else
                    object={{summary: file.summary.title, id: this.state.summary.id, title: file.title}}
                    cv_id={this.props.file.id}
                    onCancel={this.onFormCanceled}
                />
            </div>
        );
    }
}

export default ProfileSection;

ProfileSection.propTypes = {
    file: PropTypes.object
};
