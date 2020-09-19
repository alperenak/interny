import React, { Component } from 'react';
/*** Components ***/
import Card from "../../components/Card";
import Button from "../../components/Button";
import Form from "../../components/Form";
import CV from "../../components/CV";
/*** Utils ***/
import store from '../../store';
import { getCookie } from "../../utils/cookie";
import { formButtons, formItems } from "./formItems";
import { formCVData, onCVFormChange } from "../../utils/functions";
/*** Styles ***/
import styles from './cvs.scss';
/*** Icons ***/
import addIcon from '../../icons/add-circular-outlined-white-button.svg';
import editIcon from '../../icons/note-outlined-symbol.svg';
import editIconBlue from '../../icons/note-outlined-symbol-blue.svg';
import binIcon from '../../icons/recycling-bin.svg';
import binIconBlue from '../../icons/recycling-bin-blue.svg';
import LoadingModal from '../../components/LoadingModal';

class CVs extends Component {
    state = {
        sections: [],
        processing: true
    };

    async componentDidMount() {
        await this.getCVs();

    }

    getCVs = async () => {
        let id = getCookie('user_id');
        let res = await store.getCVs(id);
        this.setState({ sections: [...(res)], processing: false });
    };

    render() {
        let { user } = this.props;
        let { sections, processing } = this.state;
        return (
            <div className={styles.cvs}>
                {processing && <LoadingModal text="Loading" />}
                <div className={styles.cards}>
                    <div className={styles.CVs}>
                        <CV
                            v-for={(section, i) in sections}
                            file={section}
                            getCVs={this.getCVs}
                        />
                        {sections.length <= 0 && <Card>You don't have a CV yet. <span
                            className={styles.link_text}
                            onClick={() => window.location.pathname = "/cvcreate"}>
                            Create one?
                            </span>
                        </Card>}
                    </div>
                    <div className={styles.profileSection}>
                        <Card
                            type={'profile'}
                            getUser={this.props.getUser}
                            profileObject={{
                                avatar: user.avatar,
                                status: 'active',
                                header: `${user.name} ${user.surname}`,
                                location: 'Istanbul - Turkey',
                                sector: 'Software',
                                position: 'Full Time',
                                education: 'Graduate',
                            }}
                        />
                        <Button
                            text={'Create new CV'}
                            width={'60%'}
                            icon={addIcon}
                            iconPosition={'right'}
                            to={'/cvcreate'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CVs;
