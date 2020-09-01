import React, {Component, Fragment} from 'react';

/*** Components ***/
import Input from "../Input";

/*** Utils ***/
import validations from "../../utils/validations";

/*** Styles ***/
import styles from './form.scss';
import Button from "../Button";

/*** Icons ***/
import addIconBlack from '../../icons/add-circular-outlined-black-button.svg';
import addIcon from '../../icons/add-circular-outlined-button.svg';

class Form extends Component {
    state = {
        formItems: this.props.formItems,
        formButtons: this.props.formButtons,
        formData: {},
    };

    componentDidMount() {
        let {formDataFormatter} = this.props;
        formDataFormatter(this.props.formData).then(res => this.setState({ formData: res }));
    }

    onAddClick = (section) => {
        this.setState((state, props) => {
            state.formItems[section].items = [props.formItems[section].items[0], ...state.formItems[section].items];
            return state;
        });
    };

    onFormChange = (value, sectionKey, itemKey, index) => {
        let {onFormChange} = this.props;
        this.setState((state) => {
            state.formData = onFormChange(value, state.formData, sectionKey, itemKey, index);
            return state;
        });
    };

    render() {
        let {onSubmit, onCancel} = this.props;
        let {formItems, formData, formButtons} = this.state;
        return (
            <Fragment>
                <div className={styles.formButtons}>
                    {
                        formButtons && formButtons.map((btn, i) => {
                            return <Button
                                key={i}
                                type={btn.type}
                                text={btn.text}
                                sizeName={btn.sizeName}
                                width={btn.width}
                                onButtonClick={() => i === 0 ? onCancel() : onSubmit(formData)}
                            />
                        })
                    }
                </div>
                {
                    Object.keys(formItems).map((sectionKey, j) => {
                        return <div key={j} className={styles.formSection}>
                            {
                               formItems[sectionKey].items.map((form, i) => {
                                   return <Fragment key={i+''+j}>
                                       <div className={styles.subSections}>
                                           <div
                                               v-if={formItems[sectionKey].duplicable}
                                               className={styles.subSectionTitle}
                                           >
                                               {sectionKey}
                                           </div>
                                           {
                                               form.map((item, k) => {
                                                   return <Input
                                                       key={k}
                                                       label={item.label}
                                                       labelDescription={item.labelDescription}
                                                       placeholder={item.placeholder}
                                                       externalSource={item.externalSource}
                                                       validations={item.validations}
                                                       type={item.type}
                                                       multiple={item.multiple}
                                                       defaultValue={item.defaultValue}
                                                       errorList={item.errorList}
                                                       size={item.size}
                                                       onChange={(value, sValue) =>{
                                                           let vl = item.type !== 'select' ? value :
                                                               (item.multiple ? sValue.map(vl => vl.value) : sValue.value);
                                                           this.onFormChange(vl, formItems[sectionKey].key, item.key, i);
                                                       }}
                                                   />
                                               })
                                           }
                                       </div>
                                   </Fragment>
                               })
}
                        </div>
                    })
                }
            </Fragment>
        );
    }
}

export default Form;
