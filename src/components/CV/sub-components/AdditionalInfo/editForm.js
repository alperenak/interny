import React, {Component} from 'react';
import styles from "../substyles.scss";
import Input from "../../../Input";
import educationLevels from "../../../../utils/educationLevels";
import countries from "../../../../utils/countries";
import Button from "../../../Button";
import store from "../../../../store";


class EditForm extends Component {
    state = {
        editObject: {additional: this.props?.object},
    };

    onSaveClick = async () => {
        let {cv_id} = this.props;
        let editObject = this.state.editObject;

        await store.updateCV(cv_id, 'additional', editObject);
        await this.props.onCancel(editObject?.id);
    };

    render() {
        let {editObject} = this.state;
        let {object} = this.props;
        return (
            <div className={`${styles.editForm} ${styles[this.props.type]}`}>
                <Input
                    label={'Title'}
                    type={'textarea'}
                    size={'full'}
                    placeholder={'Enter additional info'}
                    defaultValue={editObject?.additional ? editObject.additional : ''}
                    onChange={(value) => this.setState({ editObject: {...editObject, additional: value} })}
                />
                <div className={styles.formButtons}>
                    <Button text={'Save'} type={'secondary'} sizeName={'default'} onButtonClick={async () => await this.onSaveClick()} />
                    <Button text={'Cancel'} type={'ghost'} sizeName={'default'} onButtonClick={() => this.props.onCancel(object.id)} />
                </div>
            </div>
        );
    }
}

export default EditForm;
