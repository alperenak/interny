import React, {Component, Fragment} from 'react';
import styles from "../substyles.scss";
import editIconBlue from "../../../../icons/pencil.svg";
import EditForm from "./editForm";
import Button from "../../../Button";
import addIcon from "../../../../icons/add-circular-outlined-black-button.svg";
import addIconHover from "../../../../icons/add-circular-outlined-button.svg";

class AdditionalInfo extends Component {
    state = {
        activeEditForm: false
    };

    onFormCanceled = async () => {
        this.setState({activeEditForm: false});
        await this.props.getCVs();
    };

    render() {
        let {additional} = this.props.file;
        let {activeEditForm} = this.state;
        return (
            <div className={"subContainer"}>
                <div className={"subContainer__section"}>
                    <div className={"subContainer__sectionTitle"}>
                        AdditionalInfo
                        <img
                            className={"plusIcon"}
                            src={editIconBlue}
                            alt={'icon'}
                            onClick={() => this.setState({activeEditForm: true})}
                        />
                    </div>
                    <Button
                        v-if={additional.length === 0 && !activeEditForm}
                        type={'link'}
                        icon={addIcon}
                        hoverIcon={addIconHover}
                        iconPosition={'left'}
                        text={'Add additional info'}
                        onButtonClick={() => this.setState({activeEditForm: true})}
                    />
                    <div v-else-if={additional.length > 0 && !activeEditForm}  className={"subContainer__item"}>
                        <div className={"subContainer__itemDetail"}>
                            <div v-if={additional} className={"subContainer__itemTitle"}>{additional}</div>
                        </div>
                    </div>
                    <EditForm v-else object={additional} cv_id={this.props.file.id} onCancel={this.onFormCanceled} />
                </div>
            </div>
        );
    }
}

export default AdditionalInfo;
