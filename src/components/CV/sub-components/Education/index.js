import React, {Component, Fragment} from 'react';
import styles from "../substyles.scss";
import {formatDate} from "../../../../utils/functions";
import Button from "../../../Button";
import editIconBlue from "../../../../icons/note-outlined-symbol-blue.svg";
import binIconBlue from "../../../../icons/recycling-bin-blue.svg";
import addIconBlue from "../../../../icons/add-circular-outlined-button.svg";
import Input from "../../../Input";
import EditForm from "./editForm";
import store from "../../../../store";
import addIcon from "../../../../icons/add-circular-outlined-black-button.svg";

class Education extends Component {
    state = {
        activeEditForms: [],
        isCreateFormActive: false
    };

    onFormCanceled = async (id) => {
        this.setState(state => {
            if (state.activeEditForms.includes(id))
                state.activeEditForms = state.activeEditForms.filter(e => e !== id);
            return state;
        });
        await this.props.getCVs();
    };

    onCreateFormCanceled = async () => {
        this.setState({isCreateFormActive: false});
        await this.props.getCVs();
    };


    render() {
        let {education} = this.props.file;
        let {activeEditForms, isCreateFormActive} = this.state;

        return (
            <div className={styles.Container}>
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>
                        Education
                        <img className={styles.plusIcon} src={addIconBlue} alt={'icon'} onClick={() => this.setState({isCreateFormActive: true})}/>
                    </div>
                    <div v-if={education.length === 0 && !isCreateFormActive} style={{ marginBottom: '24px' }}>
                        <Button
                            type={'link'}
                            icon={addIcon}
                            hoverIcon={addIconBlue}
                            iconPosition={'left'}
                            text={'Add education information'}
                            onButtonClick={() => this.setState({isCreateFormActive: true})}
                        />
                    </div>
                    <EditForm v-if={isCreateFormActive} cv_id={this.props.file.id} onCancel={this.onCreateFormCanceled} />
                    {education.map((item, j) => {
                        let country = '';
                        let city = '';
                        if (item?.location) {
                            country = item?.location.country;
                            city = item?.location.city;
                        }
                        let location = country && city ? `${city} - ${country}` : (country ? `${country}` : city ? `${city}` : ``);

                        let startDate = item?.startDate && formatDate(item?.startDate);
                        let endDate = item?.endDate && formatDate(item?.endDate);
                        let date = endDate && startDate ? `${startDate} - ${endDate}` : (endDate ? `${endDate}` : startDate ? `${startDate}` : ``);

                        return (
                            <Fragment>
                                <EditForm v-if={activeEditForms.includes(item.id)} object={item} cv_id={this.props.file.id} onCancel={this.onFormCanceled} />
                                <div v-else key={j} className={styles.item}>
                                    <div v-if={item.image} className={styles.itemImage}>
                                        <img src={item.image} alt={'image'}/>
                                    </div>
                                    <div className={styles.itemDetail}>
                                        <div v-if={item.title} className={styles.itemTitle}>
                                            {`${item.level} - ${item.title}`}
                                        </div>
                                        <div v-if={item.institution} className={styles.itemLocation}>
                                            {item.institution}
                                        </div>
                                        <div v-if={location} className={styles.itemLocation}>
                                            {location}
                                        </div>
                                        <div v-if={item.endDate || item.startDate} className={styles.itemDate}>
                                            {date}
                                        </div>
                                    </div>
                                    <div className={styles.buttonsContainer}>
                                        <Button
                                            type={'ghost'}
                                            text={'Edit'}
                                            icon={editIconBlue}
                                            sizeName={'small'}
                                            iconPosition={'left'}
                                            onButtonClick={() => this.setState(state => {
                                                if (!state.activeEditForms.includes(item.id))
                                                    state.activeEditForms.push(item.id);
                                                return state;
                                            })}
                                        />
                                        <Button
                                            type={'ghost'}
                                            icon={binIconBlue}
                                            sizeName={'small'}
                                            iconPosition={'center'}
                                            onButtonClick={async () => {
                                                await store.deleteCVObject(this.props.file.id, 'education', item);
                                                await this.props.getCVs();
                                            }}
                                        />
                                    </div>
                                </div>
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Education;
