import React, {Component} from 'react';

/*** Components ***/
import Card from "../Card";
import Button from "../Button";

/*** Styles ***/
import styles from './modal.scss';

class Modal extends Component {
    render() {
        return (
            <div className={styles.Modal} onClick={() => this.props.closeModal()}>
                <Card type={'modal'}>
                    <div className={styles.modal}>
                        <div v-if={this.props.header} className={styles.header}>
                            {this.props.header}
                        </div>
                        <div v-if={this.props.declaration} className={styles.declaration}>
                            {this.props.declaration}
                        </div>
                        <div className={styles.buttons}>
                            <Button
                                type={'primary'}
                                text={'OK'}
                                sizeName={'default'}
                                onButtonClick={() => this.props.closeModal()}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Modal;
