import React, {Component} from 'react';
import styles from "../substyles.scss";
import Input from "../../../Input";
import Button from "../../../Button";
import store from "../../../../store";
import languages from "../../../../utils/languages";
import languageLevels from "../../../../utils/languageLevels";


class EditForm extends Component {
    state = {
        editObject: this.props?.object,
    };

    onSaveClick = async () => {
        let {cv_id} = this.props;
        let editObject = this.state?.editObject;

        await store.updateCV(cv_id, 'languages', editObject);
        await this.props.onCancel(editObject?.id);
    };

    render() {
        let {editObject} = this.state;
        let {object} = this.props;
        return (
            <div className={`${"cvEditForm"} ${this.props.type}`}>
				<div class="row">
					<div class="col-md-12">
						<Input
		                    label={'Language'}
		                    type={'select'}
		                    size={'full'}
		                    externalSource={languages}
		                    defaultValue={languages.find(e => e.value === editObject?.title)}
		                    placeholder={'Select a language'}
		                    onChange={(value, sValue) => this.setState({ editObject: {...editObject, title: sValue.value} })}
		                />
					</div>
					<div class="col-md-12">
						<Input
		                    label={'Language Level'}
		                    type={'select'}
		                    size={'full'}
		                    externalSource={languageLevels}
		                    defaultValue={languageLevels.find(e => e.value === editObject?.level)}
		                    placeholder={'Select your level'}
		                    onChange={(value, sValue) => this.setState({ editObject: {...editObject, level: sValue.value} })}
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
