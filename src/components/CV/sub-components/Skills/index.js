import React, {Component, Fragment} from 'react';
import styles from "../substyles.scss";
import Button from "../../../Button";
import editIconBlue from "../../../../icons/note-outlined-symbol-blue.svg";
import binIconBlue from "../../../../icons/recycling-bin-blue.svg";
import addIconBlue from "../../../../icons/add-circular-outlined-button.svg";
import EditForm from "./editForm";
import store from "../../../../store";
import addIcon from "../../../../icons/add-circular-outlined-black-button.svg";

class Skills extends Component {
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
        let {skills} = this.props.file;
        let {activeEditForms, isCreateFormActive} = this.state;
        return (
            <div className={styles.Container}>
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>
                        Skills
                        <img className={styles.plusIcon} src={addIconBlue} alt={'icon'} onClick={() => this.setState({isCreateFormActive: true})} />
                    </div>
                    <div v-if={skills.length === 0 && !isCreateFormActive} style={{ marginBottom: '24px' }}>
                        <Button
                            type={'link'}
                            icon={addIcon}
                            hoverIcon={addIconBlue}
                            iconPosition={'left'}
                            text={'Add a skill'}
                            onButtonClick={() => this.setState({isCreateFormActive: true})}
                        />
                    </div>
                    <EditForm v-if={isCreateFormActive} cv_id={this.props.file.id} onCancel={this.onCreateFormCanceled} />
                    {skills.map((item, j) => {
                        return (
                            <Fragment>
                                <EditForm v-if={activeEditForms.includes(item.id)} object={item} cv_id={this.props.file.id} onCancel={this.onFormCanceled} />
                                <div v-else key={j} className={styles.item}>
                                    <div className={styles.itemDetail}>
                                        <div v-if={item.title} className={styles.itemTitle}>{item.title}</div>
                                    </div>
                                    <div className={styles.buttonsContainer}>
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
                                                await store.deleteCVObject(this.props.file.id, 'skills', item);
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

export default Skills;
