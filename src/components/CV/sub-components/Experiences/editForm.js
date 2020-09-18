import React, {Component} from 'react';
import styles from "../substyles.scss";
import Input from "../../../Input";
import educationLevels from "../../../../utils/educationLevels";
import countries from "../../../../utils/countries";
import Button from "../../../Button";
import store from "../../../../store";

class EditForm extends Component {
    state = {
        isCurrent: false,
        editObject: this.props?.object,
        location: this.props?.object?.location,
    };

    onSaveClick = async () => {
        let {cv_id} = this.props;
        let editObject = this.state.editObject;
        editObject.location = this.state.location;

        await store.updateCV(cv_id, 'experiences', editObject);
        await this.props.onCancel(editObject?.id);
    };

    render() {
        let {isCurrent, editObject, location} = this.state;
        let {object} = this.props;
        return (
            <div className={`${styles.editForm} ${styles[this.props.type]}`}>
                <Input
                    label={'Job Title'}
                    type={'text'}
                    size={'full'}
                    placeholder={'Enter job title'}
                    defaultValue={editObject?.title}
                    onChange={(value) => this.setState({ editObject: {...editObject, title: value} })}
                />
                <Input
                    label={'Company'}
                    type={'text'}
                    defaultValue={editObject?.institution}
                    placeholder={'Enter company name'}
                    onChange={(value) => this.setState({ editObject: {...editObject, institution: value} })}
                    size={'full'}
                />
                <div className={styles.couples}>
                    <Input
                        label={'Country'}
                        type={'select'}
                        size={'half'}
                        externalSource={countries}
                        defaultValue={countries.find(e => e.value === editObject?.location?.country)}
                        labelDescription={'i.e. Turkey, United Kingdom, United States'}
                        placeholder={'Select a country'}
                        onChange={(value, sValue) => this.setState({ location: {...location, country: sValue.value} })}
                    />
                    <Input
                        label={'City'}
                        type={'text'}
                        size={'half'}
                        placeholder={'Enter a city'}
                        defaultValue={editObject?.location?.city}
                        onChange={(value) => this.setState({ location: {...location, city: value} })}
                        labelDescription={'i.e. Istanbul, London, New York City'}
                    />
                </div>
                <div className={styles.checkboxContainer}>
                    <div className={styles.checkboxTitle}>Start / End Date</div>
                    <Input
                        label={'Current job'}
                        type={'checkbox'}
                        size={'full'}
                        defaultValue={!editObject?.endDate}
                        value={'isCurrent'}
                        placeholder={'Select a date'}
                        onChange={value => this.setState({ isCurrent: value.isCurrent })}
                    />
                </div>
                <div className={styles.couples}>
                    <Input
                        type={'date'}
                        size={'half'}
                        defaultValue={editObject?.startDate}
                        placeholder={'Select a date'}
                        onChange={(value) => this.setState({ editObject: {...editObject, startDate: value} })}
                    />
                    <Input
                        disabled={isCurrent}
                        type={'date'}
                        size={'half'}
                        defaultValue={editObject?.endDate}
                        placeholder={'Select a date'}
                        onChange={(value) => this.setState({ editObject: {...editObject, endDate: value} })}
                    />
                </div>
                <div className={styles.formButtons}>
                    <Button text={'Save'} type={'secondary'} sizeName={'default'} onButtonClick={async () => await this.onSaveClick()} />
                    <Button v-if={this.props.type !== 'create'} text={'Cancel'} type={'ghost'} sizeName={'default'} onButtonClick={() => this.props.onCancel(object?.id)} />
                </div>
            </div>
        );
    }
}

export default EditForm;
