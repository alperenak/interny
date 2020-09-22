import React, { Component } from 'react'
import styles from '../../style.scss'

export class AllInterns extends Component {
  render() {
    const { allCheck = false, toggleAllCheck = () => null } = this.props;

    const buttonProps = {
      type: 'button',
      onClick: toggleAllCheck,
      title: allCheck ? 'Uncheck all interns' : 'Check all interns',
      className: allCheck ? styles.AllInternsButtonChecked : '',
    };

    return (
      <div className={styles.AllInternsButtonContainer}>
        <button {...buttonProps}>
          {allCheck ? 'Uncheck' : 'Check'}
        </button>
      </div>
    )
  }
}
