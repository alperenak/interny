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

        await store.updateCV(cv_id, 'certificates', editObject);
        await this.props.onCancel(editObject?.id);
    };

    render() {
        let {editObject} = this.state;
        let {object} = this.props;
        return (
            <div className={`${styles.editForm} ${styles[this.props.type]}`}>
                <Input
                    label={'Title'}
                    type={'text'}
                    size={'full'}
                    placeholder={'Enter certificate title'}
                    defaultValue={editObject?.title}
                    onChange={(value) => this.setState({ editObject: {...editObject, title: value} })}
                />
                <div className={styles.formButtons}>
                    <Button text={'Save'} type={'secondary'} sizeName={'default'} onButtonClick={async () => await this.onSaveClick()} />
                    <Button v-if={this.props.type !== 'create'} text={'Cancel'} type={'ghost'} sizeName={'default'} onButtonClick={() => this.props.onCancel(object?.id)} />
                </div>
            </div>
        );
    }
}

export default EditForm;
