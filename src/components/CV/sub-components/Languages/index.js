import React, {Component, Fragment} from 'react';
import styles from "../substyles.scss";
import Button from "../../../Button";
import editIconBlue from "../../../../icons/note-outlined-symbol-blue.svg";
import binIconBlue from "../../../../icons/recycling-bin-blue.svg";
import addIconBlue from "../../../../icons/add-circular-outlined-button.svg";
import store from "../../../../store";
import EditForm from "./editForm";
import addIcon from "../../../../icons/add-circular-outlined-black-button.svg";

class Languages extends Component {
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
        let {languages} = this.props.file;
        let {activeEditForms, isCreateFormActive} = this.state;
        return (
            <div className={"subContainer"}>
                <div className={"subContainer__section"}>
                    <div className={"subContainer__sectionTitle"}>
                        Languages
                        <img className={"plusIcon"} src={addIconBlue} alt={'icon'} onClick={() => this.setState({isCreateFormActive: true})} />
                    </div>
                    <div v-if={languages.length === 0 && !isCreateFormActive} style={{ marginBottom: '24px' }}>
                        <Button
                            type={'link'}
                            icon={addIcon}
                            hoverIcon={addIconBlue}
                            iconPosition={'left'}
                            text={'Add a language'}
                            onButtonClick={() => this.setState({isCreateFormActive: true})}
                        />
                    </div>
                    <EditForm v-if={isCreateFormActive} cv_id={this.props.file.id} onCancel={this.onCreateFormCanceled} />
                    {languages.map((item, j) => {
                        return (
                            <Fragment>
                                <EditForm v-if={activeEditForms.includes(item.id)} object={item} cv_id={this.props.file.id} onCancel={this.onFormCanceled} />
                                <div v-else key={j} className={"subContainer__item"}>
                                    <div className={"subContainer__itemDetail"}>
                                        <div v-if={item} className={"subContainer__itemTitle"}>{item.title}</div>
                                    </div>
                                    <div v-if={item.level} className={"subContainer__itemLocation"}>
                                        {item.level}
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
                                                await store.deleteCVObject(this.props.file.id, 'languages', item);
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

export default Languages;
