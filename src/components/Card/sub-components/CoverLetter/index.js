import React, {Component} from 'react';

/*** Components ***/
import Input from "../../../Input";
import Button from "../../../Button";

/*** Styles ***/
import styles from './coverletter.scss';

class CoverLetter extends Component {
    state = {
        header: {
            text: 'Cover Letter',
            position: 'center'
        },
        buttons: [
            {
                disabled: false,
                sizeName: 'default',
                text: 'DELETE',
                type: 'ghost',
                onButtonClick: this.props.onDelete
            },
            {
                disabled: false,
                sizeName: 'default',
                text: 'SAVE',
                type: 'secondary',
                onButtonClick: this.props.onSubmit
            }
        ]
    };

    render() {
        let {coverLetter, showButtons, onChange, disabled} = this.props;
        let {buttons} = this.state;
        return (
            <div className={styles.coverLetterWrapper}>
                <Input
                    v-if={coverLetter}
                    type={'textarea'}
                    size={'large'}
                    defaultValue={coverLetter?.text}
                    onChange={onChange}
                    disabled={disabled}
                />
                <div v-if={showButtons} className={styles.buttonContainer}>
                    <Button
                        v-for={(btn, i) in buttons}
                        key={i}
                        type={btn.type}
                        disabled={btn.disabled}
                        sizeName={btn.sizeName}
                        text={btn.text}
                        onButtonClick={btn.onButtonClick}
                    />
                </div>
            </div>
        );
    }
}

export default CoverLetter;
