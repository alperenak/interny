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
import editIcon from '../../icons/note-outlined-symbol.svg';
import editIconBlue from '../../icons/note-outlined-symbol-blue.svg';
import binIcon from '../../icons/recycling-bin.svg';
import binIconBlue from '../../icons/recycling-bin-blue.svg';

class CVs extends Component {
    state = {
        sections: []
    };

    async componentDidMount() {
        await this.getCVs();
    }

    getCVs = async () => {
        let id = getCookie('user_id');
        let res = await store.getCVs(id);
        let sections = res.map(sects => {
            return {
                id: sects.id,
                header: sects.title,
                items: Object.keys(sects).filter(s => !['id', 'sectors', 'intern', 'title', 'phone', 'photo'].includes(s)).map(sect => {
                    return {
                        title: sect.replace(/\w+/g,
                            function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();}),
                        items: Array.isArray(sects[sect]) ? sects[sect].map(e => {
                            let {level, institution, title, startDate, endDate} = e;
                            let country = e.location?.country;
                            let city = e.location?.city;
                            let section = {};
                            level ? section.level = level : delete section.level;
                            institution ? section.institution = institution : delete section.institution;
                            title ? section.title = title : delete section.title;
                            country ? section.country = country : delete section.country;
                            city ? section.city = city : delete section.city;
                            startDate ? section.startDate = startDate : delete section.startDate;
                            endDate ? section.endDate = endDate : delete section.endDate;
                            return section
                        })  : []
                    };
                })
            };
        });
        this.setState({ sections: [...sections] });
    };

    onCreateClick = async () => {
        this.props.createModal({ header: 'Create CV', content: this.renderCreateCVForm });
    };

    onEditClick = async (id) => {
        this.props.createModal({ header: 'Edit CV', content: () => this.renderEditCVForm(id) });
    };

    onDeleteClick = async (id) => {
        await store.deleteCV(id);
        await this.getCVs();
    };

    renderCreateCVForm = () => {
        return (
            <Form
                formItems={formItems()}
                formButtons={formButtons()}
                onSubmit={this.onCreateFormSubmit}
                onCancel={this.props.closeModal}
            />
        );
    };

    renderEditCVForm = (id) => {
        let {sections} = this.state;
        let section = sections.find(e => e.id === id);
        let isEdit = true;
        return (
            <Form
                formItems={formItems(section)}
                formButtons={formButtons(isEdit)}
                formData={section}
                onSubmit={this.onEditFormSubmit}
                onCancel={this.props.closeModal}
            />
        );
    };

    onCreateFormSubmit = async (payload) => {
        await store.createCV(payload);
        this.props.closeModal();
        await this.getCVs();
    };

    onEditFormSubmit = async (payload) => {
        await store.updateCV(payload);
        this.props.closeModal();
    };

    renderCVButtons(id) {
        return (
            <div className={styles.buttonsCV}>
                <Button
                    width={'30px'}
                    sizeName={'small'}
                    icon={editIconBlue}
                    hoverIcon={editIcon}
                    iconPosition={'left'}
                    type={'ghost'}
                    text={'Edit'}
                    onButtonClick={() => this.onEditClick(id)}
                />
                <Button
                    width={'30px'}
                    sizeName={'small'}
                    icon={binIconBlue}
                    hoverIcon={binIcon}
                    iconPosition={'right'}
                    type={'ghost'}
                    text={'Delete'}
                    onButtonClick={() => this.onDeleteClick(id)}
                />
            </div>
        );
    }

    render() {
        let {user} = this.props;
        let {sections} = this.state;
        return (
            <div className={styles.cvs}>
                <SearchSection />
                <div className={styles.cards}>
                    <div className={styles.CVs}>
                        <Card
                            key={i}
                            type={'section'}
                            v-for={(section, i) in sections}
                            sections={section.items}
                            header={{text: section.header, position: 'center'}}
                        >{this.renderCVButtons(section.id)}</Card>
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
