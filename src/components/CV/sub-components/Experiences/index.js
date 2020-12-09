import React, {Component, Fragment} from 'react';
import styles from "../substyles.scss";
import {formatDate} from "../../../../utils/functions";
import Button from "../../../Button";
import addIconBlue from '../../../../icons/add-circular-outlined-button.svg';
import removeIconBlue from '../../../../icons/minus-circular-button.svg';


import editIconBlue from '../../../../icons/note-outlined-symbol-blue.svg';
import binIconBlue from '../../../../icons/recycling-bin-blue.svg';
import EditForm from "./editForm";
import store from "../../../../store";
import addIcon from "../../../../icons/add-circular-outlined-black-button.svg";

class Experiences extends Component {
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
        let {experiences} = this.props.file;
        let {activeEditForms, isCreateFormActive} = this.state;

        return (
            <div className={"subContainer"}>
                <div className={"subContainer__section"}>
                    <div className={"subContainer__sectionTitle"}>
                        Work Experience
						{this.state.isCreateFormActive ? (
							<img className={"plusIcon"} src={removeIconBlue} alt={'icon'} onClick={() => this.setState({isCreateFormActive: !this.state.isCreateFormActive})} />
						):(
							<img className={"plusIcon"} src={addIconBlue} alt={'icon'} onClick={() => this.setState({isCreateFormActive: !this.state.isCreateFormActive})} />
						)}

                    </div>
                    <div v-if={experiences.length === 0 && !isCreateFormActive} style={{ marginBottom: '24px' }}>
                        <Button
                            type={'link'}
                            icon={addIcon}
                            hoverIcon={addIconBlue}
                            iconPosition={'left'}
                            text={'Add an experience'}
                            onButtonClick={() => this.setState({isCreateFormActive: true})}
                        />
                    </div>
                    <EditForm v-if={isCreateFormActive} cv_id={this.props.file.id} onCancel={this.onCreateFormCanceled} />
                    {experiences.map((item, j) => {
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
                                <div v-else key={j} className={"subContainer__item"}>
                                    <div v-if={item.image} className={"subContainer__itemImage"}>
                                        <img src={item.image} alt={'image'} />
                                    </div>
                                    <div className={"subContainer__itemDetail"}>
                                        <div v-if={item.title} className={"subContainer__itemTitle"}>{item.title}</div>
                                        <div v-if={item.institution} className={"subContainer__itemLocation"}>
                                            {item.institution}
                                        </div>
                                        <div v-if={location} className={"subContainer__itemLocation"}>
                                            {location}
                                        </div>
                                        <div v-if={item.endDate || item.startDate} className={"subContainer__itemDate"}>
                                            {date}
                                        </div>
                                    </div>
                                    <div className={"subContainer__buttonsContainer"}>
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
                                                await store.deleteCVObject(this.props.file.id, 'experiences', item);
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

export default Experiences;
