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
            <div className={`${"cvEditForm"} ${this.props.type}`}>
				<div class="row">
					<div class="col-md-12">
						<Input
		                    label={'Job Title'}
		                    type={'text'}
		                    size={'full'}
		                    placeholder={'Enter job title'}
		                    defaultValue={editObject?.title}
		                    onChange={(value) => this.setState({ editObject: {...editObject, title: value} })}
		                />
					</div>
					<div class="col-md-12">
						<Input
							label={'Company'}
							type={'text'}
							defaultValue={editObject?.institution}
							placeholder={'Enter company name'}
							onChange={(value) => this.setState({ editObject: {...editObject, institution: value} })}
							size={'full'}
						/>
					</div>
					<div class="col-md-12">
						<Input
	                        label={'Country'}
	                        type={'select'}
	                        size={'full'}
	                        externalSource={countries}
	                        defaultValue={countries.find(e => e.value === editObject?.location?.country)}
	                        labelDescription={'i.e. Turkey, United Kingdom, United States'}
	                        placeholder={'Select a country'}
	                        onChange={(value, sValue) => this.setState({ location: {...location, country: sValue.value} })}
	                    />
					</div>
					<div class="col-md-12">
						<Input
	                        label={'City'}
	                        type={'text'}
	                        size={'full'}
	                        placeholder={'Enter a city'}
	                        defaultValue={editObject?.location?.city}
	                        onChange={(value) => this.setState({ location: {...location, city: value} })}
	                        labelDescription={'i.e. Istanbul, London, New York City'}
	                    />
					</div>
					<div class="col-md-12">
						<div className={"cvEditForm__checkboxContainer"}>
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
					</div>
					<div class="col-md-12">
						<Input
	                        type={'date'}
	                        size={'full'}
	                        defaultValue={editObject?.startDate}
	                        placeholder={'Select a date'}
	                        onChange={(value) => this.setState({ editObject: {...editObject, startDate: value} })}
	                    />
					</div>
					<div class="col-md-12">
						<Input
							disabled={isCurrent}
							type={'date'}
							size={'full'}
							defaultValue={editObject?.endDate}
							placeholder={'Select a date'}
							onChange={(value) => this.setState({ editObject: {...editObject, endDate: value} })}
						/>
					</div>
					<div class="col-md-12">
						<div className={"cvEditForm__formButtons"}>
		                    <Button text={'Save'} type={'secondary'} sizeName={'default'} onButtonClick={async () => await this.onSaveClick()} />
		                    <Button v-if={this.props.type !== 'create'} text={'Cancel'} type={'ghost'} sizeName={'default'} onButtonClick={() => this.props.onCancel(object?.id)} />
		                </div>
					</div>
				</div>

            </div>
        );
    }
}

export default EditForm;
