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
                text: 'SAVE',
                type: 'secondary'
            }
        ]
    };

    render() {
        let {coverLetter} = this.props;
        let {buttons} = this.state;
        return (
            <div className={styles.coverLetterWrapper}>
                <Input type={'textarea'} defaultValue={coverLetter.text}  />
                <div className={styles.buttonContainer}>
                    <Button
                        v-for={(btn, i) in buttons}
                        key={i}
                        type={btn.type}
                        disabled={btn.disabled}
                        sizeName={btn.sizeName}
                        text={btn.text}
                    />
                </div>
            </div>
        );
    }
}

export default CoverLetter;
