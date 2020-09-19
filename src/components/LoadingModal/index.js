import React, { Component } from 'react';
import ReactDOM from "react-dom"
import styles from "./LoadingModal.scss"

import loadingIcon from '../../icons/reload-outline.svg'

class LoadingModal extends Component {
    state = {}
    render() {
        return ReactDOM.createPortal(
            <div className={styles.wrapper}>
                <div className={styles.iconWrapper}><img src={loadingIcon} alt="" /></div>
                <div className={styles.text}>{this.props.text}</div>
            </div>
            , document.getElementById('modal')
        );
    }
}

export default LoadingModal;