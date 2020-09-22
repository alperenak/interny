import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*** Components ***/
import Card from "../Card";
import Button from "../Button";

/*** Styles ***/
import styles from './modal.scss';

class Modal extends Component {
    render() {
        let { closeModal, width, backgroundColor = '#fff', header, declaration, content, buttons, modalSize = 'small' } = this.props;
        const modalSizeClass = modalSize === 'small' ? styles.modalSmall : styles.modalLarge;

        return (
            <div className={styles.Modal} onClick={() => closeModal()}>
                <div onClick={(e) => { e.preventDefault(); e.stopPropagation() }} className={modalSizeClass}>
                    <Card type={'modal'} backgroundColor={backgroundColor}>
                        <div style={{ width }} className={styles.modal}>
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
                                        to={btn.to}
                                        loading={btn.loading}
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
