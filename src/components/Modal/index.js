import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*** Components ***/
import Card from "../Card";
import Button from "../Button";

/*** Styles ***/
import styles from './modal.scss';

class Modal extends Component {
    render() {
        let {closeModal, width, header, declaration, content, buttons} = this.props;
        return (
            <div className={styles.Modal} onClick={() => closeModal()}>
                <div onClick={(e) => {e.preventDefault(); e.stopPropagation()}}>
                    <Card type={'modal'}>
                        <div style={{ width: width }} className={styles.modal}>
                            <div v-if={header} className={styles.header}>
                                {header}
                            </div>
                            <div v-if={declaration} className={styles.declaration}>
                                {declaration}
                            </div>
                            <div v-if={content} className={styles.content}>
                                {content()}
                            </div>
                            <div v-if={buttons} className={styles.buttons}>
                                {buttons.map((btn, i) => {
                                    return <Button
                                        key={i}
                                        type={btn.type}
                                        text={btn.text}
                                        sizeName={btn.sizeName}
                                        width={btn.width}
                                        onButtonClick={btn.onButtonClick}
                                    />;
                                })}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func,
  content: PropTypes.any,
  buttons: PropTypes.array,
  declaration: PropTypes.string,
  header: PropTypes.string,
  width: PropTypes.string
};
