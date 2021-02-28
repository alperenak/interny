import React, {Component} from 'react';
import styles from "../substyles.scss";
import Input from "../../../Input";
import educationLevels from "../../../../utils/educationLevels";
import countries from "../../../../utils/countries";
import Button from "../../../Button";
import store from "../../../../store";


class EditForm extends Component {
    state = {
        editObject: this.props?.object,
    };

    onSaveClick = async () => {
        let {cv_id} = this.props;
        let editObject = this.state?.editObject;

        await store.updateCV(cv_id, 'skills', editObject);
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
		                    label={'Title'}
		                    type={'text'}
		                    size={'full'}
		                    placeholder={'Enter skill name'}
		                    defaultValue={editObject?.title}
		                    onChange={(value) => this.setState({ editObject: {...editObject, title: value} })}
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
