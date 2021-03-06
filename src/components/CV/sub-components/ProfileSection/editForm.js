import React, {Component} from 'react';
import styles from "./profilesection.scss";
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
        let editObject = this.state.editObject;

        await store.updateCV(cv_id, 'summary', editObject);
        await this.props.onCancel(editObject.id);
    };

    render() {
        let {editObject} = this.state;
        let {type} = this.props;
        return (
            <div className={`${"cvEditForm"} ${this.props.type}`}>
				<div class="row">
					<div class="col-md-12">
						<Input
		                    v-if={type === 'create'}
		                    label={'Title'}
		                    labelDescription={'Name your CV'}
		                    type={'text'}
		                    size={'full'}
		                    defaultValue={editObject?.title}
		                    placeholder={'Enter name'}
		                    onChange={(value) => {
		                        if (type === 'create')
		                            this.props.onChange(value, 'title');
		                        this.setState({ editObject: {title: value} })
		                    }}
		                />
					</div>
					<div class="col-md-12">
						<Input
		                    label={'Summary'}
		                    type={'textarea'}
		                    size={'full'}
		                    placeholder={'Enter a summary about you'}
		                    defaultValue={editObject?.summary}
		                    onChange={(value) => {
		                        if (type === 'create')
		                            this.props.onChange(value, 'summary');
		                        this.setState({ editObject: {summary: value} })
		                    }}
		                />
					</div>
					<div class="col-md-12">
						<div className={"cvEditForm__formButtons"}>
		                    <Button v-if={type !== 'create'} text={'Save'} type={'secondary'} sizeName={'default'} onButtonClick={async () => await this.onSaveClick()} />
		                    <Button v-if={type !== 'create'} text={'Cancel'} type={'ghost'} sizeName={'default'} onButtonClick={() => this.props.onCancel()} />
		                </div>
					</div>
				</div>
            </div>
        );
    }
}

export default EditForm;
