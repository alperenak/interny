import React, {Component} from 'react';

/*** Components ***/
import Card from "../../components/Card";
import SearchSection from "../../components/SearchSection";
import Button from "../../components/Button";
import Form from "../../components/Form";

/*** Utils ***/
import store from '../../store';
import {getCookie} from "../../utils/cookie";
import {formButtons, formItems} from "./formItems";

/*** Styles ***/
import styles from './cvs.scss';

/*** Icons ***/
import addIcon from '../../icons/add-circular-outlined-white-button.svg';

class CVs extends Component {
    state = {
        sections: []
    };

    async componentDidMount() {
        let id = getCookie('user_id');
        let res = await store.getCVs(id);
        let sections = res.map(sects => Object.keys(sects)
            .filter(s => !['id','citizenship','phone','intern','photo', 'birthDate', 'sector'].includes(s)).map(sect => {
            return {
                title: sect.replace(/\w+/g,
                    function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();}),
                items: sects[sect].map(e => {
                    return {
                        title: e.title,
                        location: e?.location?.city +" - "+ e?.location?.country,
                        date: '',
                    }
                })
            };
        }));
        this.setState({ sections: [...sections] });
    }

    onCreateClick = async () => {
        this.props.createModal({ header: 'Create CV', content: this.renderCVForm });
    };

    renderCVForm = () => {
        return (
            <Form
                formItems={formItems()}
                formButtons={formButtons()}
                onSubmit={this.onFormSubmit}
                onCancel={this.props.closeModal}
            />
        );
    };

    onFormSubmit = async (payload) => {
        await store.createCV(payload);
        this.props.closeModal();
    };

    render() {
        let {user} = this.props;
        let {sections} = this.state;
        return (
            <div className={styles.cvs}>
                <SearchSection />
                <div className={styles.cards}>
                    <div className={styles.CVs}>
                        <Card
                            type={'section'}
                            v-for={(section, i) in sections}
                            sections={section}
                            key={i}
                        />
                    </div>
                    <div className={styles.profileSection}>
                        <Card
                            type={'profile'}
                            profileObject={{
                                image: '',
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
                            onButtonClick={this.onCreateClick}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CVs;
